import React from 'react';
import {useState, useEffect} from 'react';
import './ProductDetail.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Api from '../../api';
import {addToCart} from '../../redux/cartReducer';

const Product = () => {
	const id = useParams().id;
	// const [selectedImg, setSelectedImg] = useState('img');
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	const getData = async () => {
		const results = await Api.getById(id);
		console.log(results['Item']);
		setData([results['Item']]);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='product'>
			<>
				<div className='mainImg'>
					<img src={data[0]?.PictureURL} alt='' />
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
					{/* <div className='links'>
						<div className='item'>
							<FavoriteBorderIcon /> ADD TO WISH LIST
						</div>
						<div className='item'>
							<BalanceIcon /> ADD TO COMPARE
						</div>
					</div>
					<div className='info'>
						<span>Vendor: Polo</span>
						<span>Product Type: T-Shirt</span>
						<span>Tag: T-Shirt, Women, Top</span>
					</div> */}
					<hr />
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

