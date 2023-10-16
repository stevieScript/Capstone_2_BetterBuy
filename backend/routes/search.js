const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const eBay = require('../eBayapi');
const {BadRequestError} = require('../expressError');
const e = require('express');
const router = new express.Router();
const {ensureLoggedIn, cookieJwtAuth} = require('../middleware/auth');

/** GET /search
 *
 * Route for sending search input from user to Ebay API
 *
 * Authorization required: none
 *
 * */
router.get('/', async function (req, res, next) {
	try {
		const query = req.query.q;
		const response = await eBay.finding.findItemsByKeywords({
			keywords: query,
		});
		return res.json(response.searchResult.item);
	} catch (err) {
		return next(err);
	}
});

/** GET /search/:id
 *
 * Route for getting individual item from Ebay API using item id
 *
 *
 * Authorization required: none
 *
 *
 * */

router.get('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const response = await eBay.shopping.GetSingleItem({
			ItemID: id,
			IncludeSelector: 'Details',
		});
		return res.json(response);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;

