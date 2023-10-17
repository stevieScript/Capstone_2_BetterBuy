import {Link} from 'react-router-dom';
import {Box, Card} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../../auth/UserContext';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import './ProductCard.css';

const ProductCard = ({item}) => {
	const {currentUser} = useContext(UserContext);
	if (!currentUser) {
		return <Navigate to='/' />;
	}
	return (
		<Link className='link' to={`/search/${item.itemId}`}>
			<Card className='card'>
				<div className='image'>
					<img src={item['galleryURL']} alt={item['title']} />
				</div>
				<div>
					<h2>{item['title']}</h2>
					<h3 className='prices'>${item['sellingStatus']['currentPrice']['value']}</h3>
				</div>
			</Card>
		</Link>
		// </Box>
	);
};

export default ProductCard;

