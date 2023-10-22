import {cartSlice} from './cartReducer';

describe('cart reducer', () => {
	const initialState = {
		products: [],
	};

	it('should handle initial state', () => {
		expect(cartSlice.reducer(undefined, {})).toEqual(initialState);
	});

	it('should handle addToCart', () => {
		const product = {id: 1, name: 'Product 1', quantity: 1};
		const nextState = cartSlice.reducer(initialState, cartSlice.actions.addToCart(product));
		expect(nextState.products).toEqual([product]);

		const updatedProduct = {...product, quantity: 2};
		const updatedState = cartSlice.reducer(nextState, cartSlice.actions.addToCart(updatedProduct));
		expect(updatedState.products).toEqual([updatedProduct]);
	});

	it('should handle removeItem', () => {
		const product1 = {id: 1, name: 'Product 1', quantity: 1};
		const product2 = {id: 2, name: 'Product 2', quantity: 1};
		const state = {products: [product1, product2]};

		const nextState = cartSlice.reducer(state, cartSlice.actions.removeItem(1));
		expect(nextState.products).toEqual([product2]);
	});

	it('should handle resetCart', () => {
		const state = {products: [{id: 1, name: 'Product 1', quantity: 1}]};
		const nextState = cartSlice.reducer(state, cartSlice.actions.resetCart());
		expect(nextState.products).toEqual([]);
	});
});
