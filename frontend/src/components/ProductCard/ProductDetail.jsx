import React from 'react';
import {useState} from 'react';
import './ProductDetail.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
// import useFetch from '../../hooks/useFetch';
// import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartReducer';

const Product = () => {
	// const id = useParams().id;
	// const [selectedImg, setSelectedImg] = useState('img');
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();
	// const {data, loading, error} = useFetch(`/products/${id}?populate=*`);

	let data = [
		{
			ItemID: 174781966714,
			Title: 'Apple airpods(3rd generation) Bluetooth wireless earphone charging case - white',
			Subtitle: 'Only supports iOS 17 below versions',
			CurrentPrice: {
				value: 49.99,
				currencyID: 'USD',
			},
			ListingStatus: 'Active',
			QuantitySold: 984,
			TopRatedSeller: true,
			PictureURL:
				'https://i.ebayimg.com/00/s/MTYwMFgxMTk5/z/evwAAOSwXkNkx71N/$_57.JPG?set_id=8800005007',
		},
	];

	return (
		<div className='product'>
			<>
				<div className='mainImg'>
					<img src={data[0].PictureURL} alt='' />
				</div>
				<div className='right'>
					<h1>{data[0].Title}</h1>
					<span className='price'>${data[0].CurrentPrice.value}</span>
					<p>{data[0].Subtitle}</p>
					<div className='quantity'>
						<button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
						{quantity}
						<button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
					</div>
					<button
						className='add'
						// onClick={() =>
						// 	dispatch(
						// 		addToCart({
						// 			id: data.id,
						// 			title: data.attributes.title,
						// 			desc: data.attributes.desc,
						// 			price: data.attributes.price,
						// 			img: data.attributes.img.data.attributes.url,
						// 			quantity,
						// 		})
						// )
						// }
					>
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
						<span>DESCRIPTION</span>
						<hr />
						<span>ADDITIONAL INFORMATION</span>
						<hr />
						<span>FAQ</span>
					</div>
				</div>
			</>
		</div>
	);
};

export default Product;

