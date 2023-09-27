import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class Api {
	// static token;

	// static async request(endpoint, data = {}, method = 'get') {
	// 	console.debug('API Call:', endpoint, data, method);

	// 	//there are multiple ways to pass an authorization token, this is how you pass it in the header.
	// 	const url = `${BASE_URL}/${endpoint}`;
	// 	const headers = {Authorization: `Bearer ${Api.token}`};
	// 	const params = method === 'get' ? data : {};

	// 	try {
	// 		return (await axios({url, method, data, params, headers})).data;
	// 	} catch (err) {
	// 		console.error('API Error:', err.response);
	// 		let message = err.response.data.error.message;
	// 		throw Array.isArray(message) ? message : [message];
	// 	}
	// }
	static async register(user) {
		console.log(`registering ${user.email} ...`);
		const response = await axios.post(`${BASE_URL}/auth/register`, user);
		console.log(`response ${response.data} registered ${user.email} with token ${response.data}`);
		localStorage.setItem('token', response.data);
		return response.data;
	}

	static async getUser(id) {
		const response = await axios.get(BASE_URL + `users/${id}`);
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

