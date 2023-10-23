const {authenticateJWT, ensureCorrectUser} = require('../middleware/auth');
const User = require('../models/user');
const express = require('express');
// const {BadRequestError} = require('../expressError');
const {createToken} = require('../helpers/tokens');
const router = new express.Router();

/** get user by ID */
router.get('/:id', async function (req, res, next) {
	try {
		const user = await User.get(req.params.id);
		const token = createToken(user);
		return res.json({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token,
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

module.exports = router;

