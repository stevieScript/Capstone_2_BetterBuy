const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const eBay = require('../eBayapi');
const {BadRequestError} = require('../expressError');
const e = require('express');
const router = new express.Router();

/** GET /search
 *
 * Route for sending search input from user to Ebay API
 *
 * Authorization required: none
 *
 * */
router.get('/', async function (req, res, next) {
	try {
		const query = encodeURI(req.query.q);
		// const response = await axios.get(
		// 	`https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${process.env.EBAY_APP_ID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${search}&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0`
		// );
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

