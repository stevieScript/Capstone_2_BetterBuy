import {Link} from 'react-router-dom';

const ProductCard = ({item}) => {
	console.log(item);
	return (
		<Link className='link' to={`/product/${item}`}>
			<div className='card'>
				<div className='image'>
					<img src={''} alt='' className='mainImg' />
				</div>
				<h2>{item['title']}</h2>
				<div className='prices'>
					<h3>{item['sellingStatus']['currentPrice']['value']}</h3>
					<h3>$</h3>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;

