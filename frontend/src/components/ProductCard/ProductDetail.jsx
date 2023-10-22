import React from 'react';
import {useState, useEffect} from 'react';
import './ProductDetail.css';
import {useParams} from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartReducer';
import Api from '../../api';
// import {Navigate} from 'react-router-dom';
import UserContext from '../../auth/UserContext';
import {useContext} from 'react';

const Product = () => {
	const currentUser = useContext(UserContext);
	const id = useParams().id;
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	const getData = async () => {
		console.log(id);
		const results = await Api.getById(id);
		console.log(results);
		setData([results?.['Item']]);
	};
	// const goBack = () => {
	// 	window.history.back();
	// };

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='product'>
			<>
				<div className='left'>
					<div className='mainImg'>
						<img src={data[0]?.PictureURL} alt='' />
					</div>
				</div>
				<div className='right'>
					<h1>{data[0]?.Title}</h1>
					<span className='price'>${data[0]?.CurrentPrice.value}</span>
					<p>Condition: {data[0]?.ConditionDisplayName}</p>
					<div className='quantity'>
						<button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
						{quantity}
						<button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
					</div>
					<button
						className='add'
						onClick={() =>
							dispatch(
								addToCart({
									userId: currentUser?.id,
									id: data[0]?.ItemID,
									title: data[0]?.Title,
									desc: data[0]?.ConditionDescription,
									price: data[0]?.CurrentPrice.value,
									img: data[0]?.PictureURL,
									quantity,
								})
							)
						}>
						<AddShoppingCartIcon /> ADD TO CART
					</button>
					<div className='info'>
						<span>SELLER RATING: {data[0]?.Seller?.PositiveFeedbackPercent}</span>
						<hr />
						<span>DESCRIPTION: {data[0]?.ConditionDescription}</span>
						<hr />
						<span>CATEGORY: {data[0]?.PrimaryCategoryName}</span>
					</div>
				</div>
			</>
		</div>
	);
};

export default Product;

