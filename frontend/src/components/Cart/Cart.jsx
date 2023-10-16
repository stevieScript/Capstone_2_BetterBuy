import React from 'react';
import {useSelector} from 'react-redux';
import './Cart.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Cart() {
	const products = useSelector((state) => state.cart.products);
	// const data = [
	// 	{
	// 		id: 1,
	// 		title: 'iPhone 13',
	// 		price: 1000,
	// 		quantity: 1,
	// 		isNew: true,
	// 		img: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Blue-family_09142021_big.jpg.large.jpg',
	// 		desc: 'This is a description of the iPhone 13',
	// 	},
	// 	{
	// 		id: 1,
	// 		title: 'iPhone 12',
	// 		price: 800,
	// 		quantity: 1,
	// 		isNew: true,
	// 		img: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Blue-family_09142021_big.jpg.large.jpg',
	// 		desc: 'This is a description of the iPhone 12',
	// 	},
	// ];

	return (
		<div className='cart'>
			<h1>Cart Items</h1>
			{products.map((item) => (
				<div className='cart__item' key={item.id}>
					<img src={item.img} alt={item.title} />
					<div className='cart__item__info'>
						<h2>{item.title}</h2>
						<h3>{item.price}</h3>
						<p>{item.quantity}</p>
						<p>{item.desc.substring(0, 100)}</p>
						<div className='price'>1 x 199.99</div>
					</div>
					<DeleteOutlineIcon className='delete' />
				</div>
			))}
			<div className='total'>
				<h3>Total: $199.99</h3>
				<button>Checkout</button>
				<span>Clear Cart</span>
			</div>
		</div>
	);
}

export default Cart;

