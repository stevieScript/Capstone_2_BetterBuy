import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card} from '@mui/material';
import './FeaturedItem.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartReducer';
import {Box} from '@mui/system';
// import {Navigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import UserContext from '../../auth/UserContext';

function FeatureCard({item}) {
	const {currentUser} = useContext(UserContext);
	// const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	return (
		<Box bgcolor={'background.default'} color={'text.primary'}>
			<Card className='featureCard'>
				<Link sx={{}} className='link' to={`/search/product/${item?.itemId}`}>
					<div className='featureImage'>
						<img src={item?.['galleryURL']} alt={item?.['title']} />
					</div>
				</Link>
				<div>
					<Link sx={{}} className='link' to={`/search/product/${item?.itemId}`}>
						<h2>{item?.['title']}</h2>
					</Link>
				</div>
				<div className='end'>
					<h3 className='featurePrices'>${item?.['sellingStatus']?.['currentPrice']['value']}</h3>
					<Button
						className='featureButton'
						sx={{
							// backgroundColor: '#f0c040',
							color: 'primary',
						}}
						onClick={() =>
							dispatch(
								addToCart({
									userId: currentUser,
									product: {
										id: item?.itemId,
										title: item?.title,
										desc: item?.ConditionDescription,
										price: item?.sellingStatus?.currentPrice?.value,
										img: item?.galleryURL,
										quantity: 1,
									},
								})
							)
						}>
						<AddShoppingCartIcon />
					</Button>
				</div>
			</Card>
		</Box>
	);
}

export default FeatureCard;

