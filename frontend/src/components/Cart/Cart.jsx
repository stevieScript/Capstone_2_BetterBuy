import React from 'react';
import {useSelector} from 'react-redux';
import './Cart.css';
import {useDispatch} from 'react-redux';
import Api from '../../api';
import {Link} from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {removeItem, resetCart} from '../../redux/cartReducer';
// import UserContext from '../../auth/UserContext';
// import {useContext} from 'react';

function Cart() {
	// const {currentUser} = useContext(UserContext);
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

	function emptyCart() {
		return (
			<div className='empty'>
				<h1>Cart is Empty</h1>
			</div>
		);
	}

	return (
		<div className='cart'>
			<h1>Cart Items:</h1>
			{products.length === 0 && emptyCart()}
			{products.map((item) => (
				<div className='item' key={item?.id}>
					<img className='itemImg' src={item?.img} alt={item?.title} />
					<div className='details'>
						<Link to={`/search/product/${item.itemId}`}>
							<h1>{item?.title}</h1>
						</Link>
						<p>{item?.desc?.substring(0, 100)}</p>
						<div className='price'>
							{item?.quantity} X ${item?.price}
						</div>
					</div>
					<DeleteOutlineIcon className='delete' onClick={() => dispatch(removeItem(item?.id))} />
				</div>
			))}
			<div className='total'>
				<span>Subtotal:</span>
				<span>{total?.toFixed(2)}</span>
			</div>
			<button className='checkout' onClick={handleCheckout}>
				Checkout
			</button>
			<span className='reset' onClick={() => dispatch(resetCart())}>
				Clear Cart
			</span>
		</div>
	);
}

export default Cart;

