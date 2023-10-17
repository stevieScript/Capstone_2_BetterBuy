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
router.get('/:search', async function (req, res, next) {
	try {
		const query = req.params.search;
		const response = await eBay.finding.findItemsByKeywords({
			keywords: query,
		});
		return res.json(response.searchResult.item);
	} catch (err) {
		return next(err);
	}
});

/** GET /search/product/id
 *
 * Route for getting individual item from Ebay API using item id
 *
 *
 * Authorization required: none
 *
 *
 * */

router.get('/product/:id', async function (req, res, next) {
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

/** GET /top-deals
 *
 * to get top selling items from Ebay API
 *
 * Authorization required: none
 *
 * */

router.get('/category/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const response = await eBay.finding.findItemsByCategory({
			categoryId: id,
			sortOrder: 'BestMatch',
		});
		return res.json(response);
	} catch (err) {
		consol.log(err);
		return next(err);
	}
});

module.exports = router;

