import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	products: [],
	history: [],
	userId: null,
	token: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setUserId: (state, action) => {
			if (action.payload !== state.userId) {
				state.products = [];
				state.userId = action.payload;
			} else {
				state.userId = action.payload;
			}
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		removeToken: (state) => {
			state.token = null;
		},
		addToCart: (state, action) => {
			if (action.payload.userId !== state.userId) {
				state.products = [];
				state.userId = action.payload.userId;
			}
			const item = state.products.find((item) => item.id === action.payload.product.id);
			if (item) {
				item.quantity += action.payload.product.quantity;
			} else {
				state.products.push(action.payload.product);
			}
		},
		removeItem: (state, action) => {
			state.products = state.products.filter((item) => item.id !== action.payload);
		},
		resetCart: (state) => {
			state.products = [];
		},
		completedOrder: (state) => {
			state.history.push(...state.products);
			state.products = [];
		},
		clearHistory: (state) => {
			state.history = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addToCart,
	removeItem,
	resetCart,
	setUserId,
	completedOrder,
	setToken,
	removeToken,
	clearHistory,
} = cartSlice.actions;

export default cartSlice.reducer;

