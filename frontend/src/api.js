import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class Api {
	static async register(user) {
		const response = await axios.post(`${BASE_URL}/auth/register`, user);
		localStorage.setItem('user', response.data.id);
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

