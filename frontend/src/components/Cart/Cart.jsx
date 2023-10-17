import React from 'react';
import {useSelector} from 'react-redux';
import './Cart.css';
import {useDispatch} from 'react-redux';
import Api from '../../api';
import {Navigate} from 'react-router-dom';
import UserContext from '../../auth/UserContext';
import {useContext} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {removeItem, resetCart} from '../../redux/cartReducer';
import {current} from '@reduxjs/toolkit';

function Cart() {
	const {currentUser} = useContext(UserContext);
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cart.products);
	const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleCheckout = async () => {
		const response = await Api.stripeCheckout(products);
		if (response.status === 200) {
			console.log('success', response?.data?.url);
			window.location.href = response?.data?.url;
		}
	};

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<div className='cart'>
			<h1>Cart Items</h1>
			{products.map((item) => (
				<div className='cart__item' key={item?.id}>
					<img src={item?.img} alt={item?.title} />
					<div className='cart__item__info'>
						<h2>{item?.title}</h2>
						<h3>{item?.price}</h3>
						<p>{item?.quantity}</p>
						<p>{item?.desc?.substring(0, 100)}</p>
						<div className='price'>
							{item?.quantity} X ${item?.price}
						</div>
					</div>
					<DeleteOutlineIcon className='delete' onClick={() => dispatch(removeItem(item?.id))} />
				</div>
			))}
			<div className='total'>
				<h3>Subtotal: {total?.toFixed(2)} </h3>
				<button onClick={handleCheckout}>Checkout</button>
				<span onClick={() => dispatch(resetCart())}>Clear Cart</span>
			</div>
		</div>
	);
}

export default Cart;

