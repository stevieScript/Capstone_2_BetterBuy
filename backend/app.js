const express = require('express');
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigin = isDevelopment
	? 'http://localhost:3000'
	: 'https://determined-reward.surge.sh';
const cors = require('cors');
const {NotFoundError} = require('./expressError');
const {authenticateJWT} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const checkoutRoutes = require('./routes/checkout');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(authenticateJWT);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/search', authenticateJWT, searchRoutes);
app.use('/create-checkout-session', authenticateJWT, checkoutRoutes);
app.options('*', cors());
app.use(
	cors({
		origin: allowedOrigin,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: [
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
		],
		credentials: true,
	})
);

// enable pre-flight request for all routes

app.use((req, res, next) => {
	console.log(`Received ${req.method} request to ${req.path} from ${req.origin}`);
	next();
});

// app.use(
// 	cors({
// 		origin: allowedOrigin,
// 		credentials: true,
// 	})
// );

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

