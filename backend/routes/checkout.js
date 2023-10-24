const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const express = require('express');
const router = new express.Router();

router.post('/', async (req, res) => {
	function priceCents(price) {
		return Math.round(price * 100);
	}
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: req.body.products.map((product) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: product.title,
							description: product.desc,
						},
						unit_amount: priceCents(product.price),
					},
					quantity: product.quantity,
				};
			}),
			success_url: `${CLIENT_URL}/checkout/success?success=true`,
			cancel_url: `${CLIENT_URL}/checkout/success?success=false`,
		});
		res.json({sessionId: session.id, url: session.url});
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;

