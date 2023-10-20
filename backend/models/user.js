const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');
const {UnauthorizedError, BadRequestError, NotFoundError} = require('../expressError');
const {sqlForPartialUpdate} = require('../helpers/sql');

/** Related functions for users. */
class User {
	/**get method to retreive user by ID */
	static async get(id) {
		const result = await db.query(
			`SELECT id, email, first_name AS "firstName", last_name AS "lastName"
					 FROM users
					 WHERE id = $1
					 `,
			[id]
		);

		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${id}`);
		return user;
	}
	/** authenticate user with password.
	 * Returns { first_name, last_name, email }
	 *
	 * Throws UnauthorizedError is user not found or wrong password.
	 **/
	static async authenticate(email, password) {
		// try to find the user first
		const result = await db.query(
			`SELECT id, password
           FROM users
           WHERE email = $1`,
			[email]
		);

		const user = result.rows[0];
		if (user) {
			// compare hashed password to a new hash from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				// delete user.password;
				return user.id;
			}
		}

		throw new UnauthorizedError('Invalid username/password');
	}

	/** Register user with data.
	 * Returns { firstName, lastName, email, password }
	 * Throws BadRequestError on duplicates.
	 * */
	static async register({firstName, lastName, email, password}) {
		const duplicateCheck = await db.query(
			`SELECT email
           FROM users
           WHERE email = $1`,
			[email]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate email: ${email}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
           (first_name,
            last_name,
            email, 
						password)
           VALUES ($1, $2, $3, $4)
           RETURNING id, email`,
			[firstName, lastName, email, hashedPassword]
		);
		const user = result.rows[0];

		return user;
	}

	/** Update user data with `data`.
	 *
	 * This is a "partial update" --- it's fine if data doesn't contain
	 * all the fields; this only changes provided ones.
	 *
	 * Data can include:
	 *   { firstName, lastName, password, email, isAdmin }
	 *
	 * Returns { username, firstName, lastName, email, isAdmin }
	 *
	 * Throws NotFoundError if not found.
	 *
	 * WARNING: this function can set a new password or make a user an admin.
	 * Callers of this function must be certain they have validated inputs to this
	 * or a serious security risks are opened.
	 */
	static async update(id, data) {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
		}

		const {setCols, values} = sqlForPartialUpdate(data, {
			firstName: 'first_name',
			lastName: 'last_name',
		});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE users 
											SET ${setCols} 
											WHERE id = ${idVarIdx} 
											RETURNING id, 
																first_name AS "firstName", 
																last_name AS "lastName", 
																email`;

		const result = await db.query(querySql, [...values, id]);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${id}`);

		delete user.password;
		return user;
	}
}

module.exports = User;

