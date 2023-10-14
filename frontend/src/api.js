import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class Api {
	static async register(user) {
		try {
			const response = await axios.post(`${BASE_URL}/auth/register`, user);
			localStorage.setItem('user', response.data.id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async login(credentials) {
		try {
			const response = await axios.post(`${BASE_URL}/auth/token`, credentials);
			localStorage.setItem('user', response.data.id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getUser(id) {
		const response = await axios.get(BASE_URL + `users/${id}`);
		return response.data;
	}
	static async getProducts() {
		const response = await axios.get(BASE_URL + 'products');
		return response.data;
	}

	static async getCart() {
		const response = await axios.get(BASE_URL + 'cart');
		return response.data;
	}

	static async search(searchTerm) {
		try {
			const response = await axios.get(BASE_URL + '/search', {params: {q: searchTerm}});
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}
}

export default Api;

