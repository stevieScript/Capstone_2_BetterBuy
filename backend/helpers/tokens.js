const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const e = require('express');

/** return signed JWT from user data. */

function createToken(user) {
	let payload = {
		username: user.firstName,
	};

	return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {createToken};

