import React from 'react';
import {useSelector} from 'react-redux';
import './Cart.css';
import {useDispatch} from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {removeItem, resetCart} from '../../redux/cartReducer';

function Cart() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cart.products);

	const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
				<button>Checkout</button>
				<span onClick={() => dispatch(resetCart())}>Clear Cart</span>
			</div>
		</div>
	);
}

export default Cart;

