import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Card} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../../auth/UserContext';
import './FeaturedItem.css';

function FeatureCard({item}) {
	const {currentUser} = useContext(UserContext);
	if (!currentUser) {
		return <Navigate to='/' />;
	}
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

