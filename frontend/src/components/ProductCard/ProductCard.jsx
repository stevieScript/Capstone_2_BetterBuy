import {Link} from 'react-router-dom';
import {Card} from '@mui/material';
// import {Navigate} from 'react-router-dom';
// import {useContext} from 'react';
// import UserContext from '../../auth/UserContext';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import './ProductCard.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartReducer';
import Button from '@mui/material/Button';

const ProductCard = ({item}) => {
	// const {currentUser} = useContext(UserContext);

	const dispatch = useDispatch();
	return (
		<Card className='card'>
			<Link className='link' to={`/search/product/${item?.itemId}`}>
				<div className='image'>
					<img src={item?.['galleryURL']} alt={item?.['title']} />
				</div>
			</Link>
			<div className='titlePrice'>
				<Link className='link' to={`/search/product/${item?.itemId}`}>
					<h2>{item?.['title']}</h2>
					<p>{item?.['condition']['conditionDisplayName']}</p>
				</Link>
				<div className='end'>
					<h3 className='prices'>${item?.['sellingStatus']?.['currentPrice']['value']}</h3>
					<Button
						className='featureButton'
						sx={{
							color: 'primary',
						}}
						onClick={() =>
							dispatch(
								addToCart({
									id: item?.itemId,
									title: item?.title,
									desc: item?.ConditionDescription,
									price: item?.sellingStatus?.currentPrice?.value,
									img: item?.galleryURL,
									quantity: 1,
								})
							)
						}>
						<AddShoppingCartIcon />
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ProductCard;

