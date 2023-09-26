const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');
const {UnauthorizedError, BadRequestError} = require('../expressError');

/** Related functions for users. */
class User {
	/** authenticate user with password.
	 * Returns { first_name, last_name, email }
	 *
	 * Throws UnauthorizedError is user not found or wrong password.
	 **/
	static async authenticate(email, password) {
		// try to find the user first
		const result = await db.query(
			`SELECT id, password,
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
           RETURNING id`,
			[firstName, lastName, email, hashedPassword]
		);

		const user = result.rows[0];

		return user;
	}

	/** change password for user
	 * Returns { firstName, lastName, email, password }
	 * Throws BadRequestError on duplicates.
	 * */
	static async changePassword({password, email}) {
		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`UPDATE users
         SET password=$1
         WHERE email=$2
         RETURNING email`,
			[hashedPassword, email]
		);

		const user = result.rows[0];

		return user;
	}
}

module.exports = User;

