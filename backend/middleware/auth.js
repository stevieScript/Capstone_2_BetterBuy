'use strict';

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const {UnauthorizedError} = require('../expressError');

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer /, '').trim();
			// res.locals.user = jwt.verify(token, SECRET_KEY);
			req.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (err) {
		return next();
	}
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
	try {
		if (!req.user) throw new UnauthorizedError();
		return next();
	} catch (err) {
		return next(err);
	}
}

function cookieJwtAuth(req, res, next) {
	const token = req.cookies.token;
	// Handle no token scenario, e.g., return a specific status or proceed without user data
	if (!token) return next();

	try {
		req.user = jwt.verify(token, SECRET_KEY);
		return next();
	} catch (err) {
		res.clearCookie('token'); // Clear the invalid token
		return next(); // or return res.status(401).send('Invalid token');
	}
}

module.exports = {
	authenticateJWT,
	cookieJwtAuth,
	ensureLoggedIn,
};

