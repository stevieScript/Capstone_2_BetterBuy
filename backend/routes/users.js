// const jwt = require('jsonwebtoken');
// const {SECRET_KEY} = require('../config');
// const {cookieJwtAuth, authenticateJWT} = require('../middleware/auth');
const {authenticateJWT} = require('../middleware/auth');
const User = require('../models/user');
const express = require('express');
// const {BadRequestError} = require('../expressError');
const router = new express.Router();

/** get user by ID */
router.get('/:id', async function (req, res, next) {
	try {
		const user = await User.get(req.params.id);
		return res.json({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	} catch (err) {
		return next(err);
	}
});

/** update user */
router.patch('/:id', authenticateJWT, async function (req, res, next) {
	try {
		const user = await User.update(req.params.id, req.body);
		return res.json({
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		});
	} catch (err) {
		return next(err);
	}
});

/** logout user */

router.delete('/logout', async function (req, res, next) {
	try {
		//remove the token header from the request
		res.clearCookie('token');
		return res.json({message: 'Logged out'});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

