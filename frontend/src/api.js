import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class Api {
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = {Authorization: `Bearer ${Api.token}`};
		const params = method === 'get' ? data : {};

		try {
			return (await axios({url, method, data, params, headers})).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}
	static async register(user) {
		console.log(`registering ${user.email} ...`);
		const response = await this.request('auth/register', user, 'post');
		localStorage.setItem('token', response.token);
		console.log(`registered ${user.email}`);
		return response.data;
	}

	static async getUser(email) {
		const response = await this.request(BASE_URL + `users/${email}`);
		return response.data;
	}
	static async getProducts() {
		const response = await this.request(BASE_URL + 'products');
		return response.data;
	}

	static async getCart() {
		const response = await this.request(BASE_URL + 'cart');
		return response.data;
	}
}

export default Api;

