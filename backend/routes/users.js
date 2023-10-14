const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const User = require('../models/user');
const express = require('express');
const {BadRequestError} = require('../expressError');
const router = new express.Router();

/** get user by ID */
router.get('/:id', async function (req, res, next) {
	// const user = await User.get(req.params.id);
	try {
		const user = await User.get(req.params.id);
		return res.json({id: user.id, email: user.email});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

