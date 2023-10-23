import React from 'react';
import {useSelector} from 'react-redux';
import {removeItem, clearHistory} from '../../redux/cartReducer';
import {useDispatch} from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link} from 'react-router-dom';
import './OrderHistory.css';
// import Box from '@mui/material';

function OrderHistory() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cart.history);

	// const total = products.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
	return (
		<div className='history'>
			<h1>Order History</h1>
			<div className='link'>
				<span className='resetHistory' onClick={() => dispatch(clearHistory())}>
					Clear Order History
				</span>
			</div>
			{products.map((item) => (
				<div className='historyItem' key={item?.id}>
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
				</div>
			))}
		</div>
	);
}
// {
// 	/* <div className='total'>
// 					<span>Subtotal:</span>
// 					<span>{total?.toFixed(2)}</span>
// 				</div> */
// }

// {
// 	/* <DeleteOutlineIcon className='delete' onClick={() => dispatch(removeItem(item?.id))} /> */
// }
export default OrderHistory;

