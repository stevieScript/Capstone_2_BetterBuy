const express = require('express');
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigin = isDevelopment
	? 'http://localhost:3000'
	: 'https://sb-capstone-2-betterbuy.onrender.com';
const cors = require('cors');
const {NotFoundError} = require('./expressError');
const {authenticateJWT, cookieJwtAuth} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const checkoutRoutes = require('./routes/checkout');
const app = express();
app.use(
	cors({
		origin: allowedOrigin,
		credentials: true,
	})
);
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/search', cookieJwtAuth, searchRoutes);
app.use('/create-checkout-session', cookieJwtAuth, checkoutRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: {message, status},
	});
});

module.exports = app;

