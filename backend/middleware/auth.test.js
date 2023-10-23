const auth = require('./auth');
const jwt = require('jsonwebtoken');

describe('authenticateJWT middleware', () => {
	let req, res, next;

	beforeEach(() => {
		req = {
			headers: {},
		};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		next = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 if no token is provided', () => {
		auth.authenticateJWT(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({error: new Error('No token provided')});
	});

	it('should return 401 if token is invalid', () => {
		req.headers.authorization = 'Bearer invalid-token';

		auth.authenticateJWT(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({message: 'Unauthorized'});
	});

	it('should set user in res.locals and call next if token is valid', () => {
		const user = {id: 1, name: 'John Doe'};
		const token = jwt.sign(user, 'secret-key');
		req.headers.authorization = `Bearer ${token}`;

		auth.authenticateJWT(req, res, next);

		expect(res.locals.user).toEqual(user);
		expect(next).toHaveBeenCalled();
	});
});
