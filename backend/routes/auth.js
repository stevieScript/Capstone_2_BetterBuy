const jsonschema = require('jsonschema');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const User = require('../models/user');
const express = require('express');
const {BadRequestError} = require('../expressError');
const router = new express.Router();
// const {createToken} = require('../helpers/tokens');
const userAuthSchema = require('../schemas/userAuth.json');
const userRegisterSchema = require('../schemas/userRegister.json');

/** POST /auth/token:  { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 *
 * */
router.post('/token', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userAuthSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const {email, password} = req.body;
		const user = await User.authenticate(email, password);
		const token = jwt.sign({id: user}, SECRET_KEY, {
			expiresIn: 60 * 60 * 24, // 1 day
		});
		res.cookie('token', token, {httpOnly: true});
		return res.json({user});
	} catch (err) {
		return next(err);
	}
});

/** POST /auth/register:   { user } => { token }
 * user must include { password, firstName, lastName, email }
 * Returns JWT token which can be used to authenticate further requests.
 * This will add user to database.
 * Authorization required: none
 * */
router.post('/register', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userRegisterSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newUser = await User.register(req.body);

		const token = jwt.sign({id: newUser.id}, SECRET_KEY, {
			expiresIn: '24h',
		});
		res.cookie('token', token, {httpOnly: true});
		return res.status(201).json({id: newUser.id, email: newUser.email});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

