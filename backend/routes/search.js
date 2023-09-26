const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const eBay = require('../eBayapi');
const {BadRequestError} = require('../expressError');
const e = require('express');
const router = new express.Router();
const {ensureLoggedIn} = require('../middleware/auth');

/** GET /search
 *
 * Route for sending search input from user to Ebay API
 *
 * Authorization required: none
 *
 * */
router.get('/', ensureLoggedIn, async function (req, res, next) {
	try {
		const query = req.query.q;
		const response = await eBay.finding.findItemsByKeywords({
			keywords: query,
		});
		return res.json(response.searchResult.item);
	} catch (err) {
		console.log(err);
		return next(err);
	}
});

module.exports = router;

