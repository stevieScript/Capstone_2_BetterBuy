const eBayApi = require('ebay-api');
// const process = require('dotenv');

const eBay = new eBayApi({
	appId: process.env.EBAY_APP_ID,
	certId: process.env.EBAY_CERT_ID,
	sandbox: true,
});

module.exports = eBay;

