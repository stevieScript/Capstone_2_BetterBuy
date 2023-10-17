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
			localStorage.setItem('user', JSON.stringify(response.data.user));
			return response.data.user;
		} catch (err) {
			console.error(err);
		}
	}

	static async getUser(id) {
		try {
			const response = await axios.get(`${BASE_URL}/users/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}
	// static async getProducts() {
	// 	const response = await axios.get(BASE_URL + 'products');
	// 	return response.data;
	// }

	static async getCart() {
		const response = await axios.get(BASE_URL + 'cart');
		return response.data;
	}

	static async search(searchTerm) {
		try {
			const response = await axios.get(`${BASE_URL}/search/${searchTerm}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getById(id) {
		try {
			const response = await axios.get(`${BASE_URL}/search/product/${id}`);
			console.log(`response.data: ${response.data}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getProductsbyCategoryID(id) {
		try {
			const response = await axios.get(`${BASE_URL}/search/category/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async addToCart(id) {
		try {
			const response = await axios.post(`${BASE_URL}/cart/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async removeFromCart(id) {
		try {
			const response = await axios.delete(`${BASE_URL}/cart/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async stripeCheckout(products, total) {
		try {
			console.log(products, 'products');
			const response = await axios.post(`${BASE_URL}/create-checkout-session`, {
				products,
			});
			return response;
		} catch (err) {
			console.error(err);
		}
	}
}

export default Api;

