import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

function FeaturedItem({products = []}) {
	return (
		<div className='electronics'>
			<h1>{}</h1>
			<Box sx={{flexGrow: 1}}>
				<Grid container spacing={2}>
					{products[4].map((item) => (
						<Grid item xs={6} md={3} key={item.itemId}>
							<ProductCard item={item} />
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
}

export default FeaturedItem;

