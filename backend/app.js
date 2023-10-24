const express = require('express');
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigin = 'https://determined-reward.surge.sh';
const cors = require('cors');
const {NotFoundError} = require('./expressError');
const {authenticateJWT} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const checkoutRoutes = require('./routes/checkout');
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(authenticateJWT);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/search', authenticateJWT, searchRoutes);
app.use('/create-checkout-session', authenticateJWT, checkoutRoutes);

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

