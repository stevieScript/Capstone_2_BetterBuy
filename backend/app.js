const express = require('express');
const cors = require('cors');
const {NotFoundError} = require('./expressError');
const {authenticateJWT, cookieJwtAuth} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/users');
const checkoutRoutes = require('./routes/checkout');
const app = express();
app.use(
	cors()
	// 	{
	// 	origin: 'http://localhost:3000',
	// }
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
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

