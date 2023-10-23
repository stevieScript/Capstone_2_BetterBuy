'use strict';

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const {UnauthorizedError} = require('../expressError');
const e = require('express');

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
		if (!authHeader) {
			const error = new UnauthorizedError('No token provided');
			return res.status(401).json({error});
		}

		const token = authHeader.replace(/^[Bb]earer /, '').trim();
		res.locals.user = jwt.verify(token, SECRET_KEY);
		return next();
	} catch (err) {
		return res.status(401).json({message: 'Unauthorized'});
	}
}

/** Middleware to use when updateing a user's info.
 *
 * If not the correct user or not a token, raises Unauthorized.
 */

function ensureCorrectUser(req, res, next) {
	try {
		const user = res.locals.user;
		if (!(user && user.id === req.params.id)) {
			const err = new UnauthorizedError();
			return next(err);
		}
		return next();
	} catch (err) {
		return next(err);
	}
}

// function cookieJwtAuth(req, res, next) {
// 	const token = req.cookies.token;
// 	// Handle no token scenario, e.g., return a specific status or proceed without user data
// 	if (!token) throw new UnauthorizedError();
// 	try {
// 		req.user = jwt.verify(token, SECRET_KEY);
// 		return next();
// 	} catch (err) {
// 		res.clearCookie('token'); // Clear the invalid token
// 		return res.status(401).send('Invalid token');
// 	}
// }

module.exports = {
	authenticateJWT,
	ensureCorrectUser,
};

