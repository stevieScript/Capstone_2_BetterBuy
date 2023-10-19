import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from '@mui/material';
import './FeaturedItem.css';
// import {Navigate} from 'react-router-dom';
// import {useContext} from 'react';
// import UserContext from '../../auth/UserContext';

function FeatureCard({item}) {
	// const {currentUser} = useContext(UserContext);

	return (
		<Link sx={{}} className='link' to={`/search/product/${item?.itemId}`}>
			<Card className='featureCard'>
				<div className='featureImage'>
					<img src={item?.['galleryURL']} alt={item?.['title']} />
				</div>
				<div>
					<h2>{item?.['title']}</h2>
					<h3 className='featurePrices'>${item?.['sellingStatus']?.['currentPrice']['value']}</h3>
				</div>
			</Card>
		</Link>
	);
}

export default FeatureCard;

