const jsonschema = require('jsonschema');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const User = require('../models/user');
const express = require('express');
const {BadRequestError} = require('../expressError');
const router = new express.Router();
const {createToken} = require('../helpers/tokens');
// const {createToken} = require('../helpers/tokens');
const userAuthSchema = require('../schemas/userAuth.json');
const userRegisterSchema = require('../schemas/userRegister.json');
const isProduction = process.env.NODE_ENV === 'production';

/** POST /auth/token:  { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 *	// console.log('token', token);
		//this one shows up in the console
		// res.cookie('token', token, {httpOnly: true, secure: isProduction ? true : false});

		// res.setHeader(Authorization, `Bearer ${token}`);
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
		const token = createToken(user);

		return res.json({user, token});
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

		const token = createToken(newUser);
		// res.cookie('token', token, {httpOnly: true, secure: isProduction ? true : false});
		// res.setHeader(Authorization, `Bearer ${token}`);
		return res.status(201).json({id: newUser.id, email: newUser.email, token});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

