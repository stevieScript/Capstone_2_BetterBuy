const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const eBayApi = require('../eBayapi');
const {BadRequestError} = require('../expressError');
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
		const {search} = req.query;
		const response = await eBayApi.finding.findItemsByKeywords({
			keywords: search,
			outputSelector: ['SellerInfo', 'PictureURLLarge'],
		});
		return res.json(response.searchResult.item);
	} catch (err) {
		console.log(err);
		return next(err);
	}
});

module.exports = router;

