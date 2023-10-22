import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class Api {
	static async register(user) {
		try {
			const response = await axios.post(`${BASE_URL}/auth/register`, user);

			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async login(credentials) {
		try {
			const response = await axios.post(`${BASE_URL}/auth/token`, credentials);
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

	static async updateUser(id, user) {
		try {
			const response = await axios.patch(`${BASE_URL}/users/${id}`, user);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async logout() {
		try {
			const response = await axios.delete(`${BASE_URL}/users/logout`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getCart() {
		const response = await axios.get(BASE_URL + 'cart');
		return response.data;
	}

	static async search(searchTerm) {
		try {
			const response = await axios.get(`${BASE_URL}/search/products/${searchTerm}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getById(id) {
		try {
			const response = await axios.get(`${BASE_URL}/search/product/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getByCategoryID(id) {
		try {
			const response = await axios.get(`${BASE_URL}/search/category/${id}`);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}

	static async getLandingPage(id) {
		try {
			const response = await axios.get(`${BASE_URL}/search/landing/${id}`);
			return response;
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

