import {Box} from '@mui/system';
import FeatureCard from './FeatureCard';
import './FeaturedItem.css';

const FeaturedItems = (item) => {
	return (
		<Box className='featuredProducts' bgcolor={'background.default'} color={'text.primary'}>
			<div className='top'>
				<h1>{item.title}</h1>
				<p>
					{item.description}
					<span>See more</span>
				</p>
			</div>
			<div className='bottom'>
				{item?.map((item) => (
					<FeatureCard item={item} key={item.id} />
				))}
			</div>
		</Box>
	);
};

export default FeaturedItems;

