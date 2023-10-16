import {Link} from 'react-router-dom';
import {Box, Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ProductCard.css';

const ProductCard = ({item}) => {
	return (
		// <Card sx={{display: 'flex'}} className='link' to={`/product/${item.itemId}`}>
		// 	<CardMedia
		// 		component='img'
		// 		height='200px'
		// 		width='200px'
		// 		image={item['galleryURL']}
		// 		alt={item['title']}
		// 	/>
		// 	<Box sx={{display: 'flex', flexDirection: 'column'}}>
		// 		<CardContent>
		// 			<Typography variant='h6' component='div'>
		// 				{item['title']}
		// 			</Typography>
		// 			<Typography variant='h5' component='div'>
		// 				${item['sellingStatus']['currentPrice']['value']}
		// 			</Typography>
		// 			<Button variant='contained' color='primary' fullWidth>
		// 				View Item
		// 			</Button>
		// 		</CardContent>
		// 	</Box>

		// 	{/* <h4>{item['title']}</h4>
		// 	<span className='prices'>${item['sellingStatus']['currentPrice']['value']}</span> */}
		// </Card>
		<Box>
			<Link className='link' to={`/product/${item.itemId}`}>
				<Card className='card'>
					<div className='image'>
						<img src={item['galleryURL']} alt={item['title']} className='image' />
					</div>
					<div>
						<Link className='link' to={`/search/${item.itemId}`}>
							<h4>{item['title']}</h4>
						</Link>
						<span className='prices'>${item['sellingStatus']['currentPrice']['value']}</span>
					</div>
				</Card>
			</Link>
		</Box>
	);
};

export default ProductCard;

