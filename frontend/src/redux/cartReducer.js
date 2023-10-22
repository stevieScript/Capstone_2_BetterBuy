import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	products: [],
	userId: null,
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
	},
});

// Action creators are generated for each case reducer function
export const {addToCart, removeItem, resetCart, setUserId} = cartSlice.actions;

export default cartSlice.reducer;

