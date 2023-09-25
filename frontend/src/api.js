import axios from 'axios';

const baseURL = 'http://localhost:3001/';

class Api {
	static async register(user) {
		console.log(user);
		const response = await axios.post(baseURL + 'auth/register', user);
		console.log(response.data);
		return response.data;
	}
	static async getProducts() {
		const response = await axios.get(baseURL + 'products');
		return response.data;
	}

	static async getCart() {
		const response = await axios.get(baseURL + 'cart');
		return response.data;
	}
}

export default Api;

