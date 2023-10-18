import React, {useEffect, useState} from 'react';

import {Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';

// import {useDispatch} from 'react-redux';
import SearchBar from './SearchBar';
// import ProductCard from './ProductCard/ProductCard';
// import FeaturedItems from './FeaturedProducts/FeaturedItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {getLandingPage} from '../helpers/helpers';
import FeatureCard from './FeaturedProducts/FeatureCard';
// import Api from '../api';

function LandingPage() {
	const {currentUser} = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		async function getProducts() {
			const products = await getLandingPage();
			setProducts(products);
			setLoading(false);
		}
		getProducts();
	}, []);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	const search = async (searchTerm) => {
		// const products = await Api.search(searchTerm);
		setProducts(products);

		navigate(`/search/${searchTerm}`);
	};
	return (
		<div className='main'>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<SearchBar search={search} />
					{/* Featured accepts an array and maps cards
					{products.electronics?.map((item) => (
						<FeatureCard item={item} key={item.itemId} />
					))}
					{products.cellPhones?.map((item) => (
						<FeatureCard item={item} key={item.itemId} />
					))}
					{products.instruments?.map((item) => (
						<FeatureCard item={item} key={item.itemId} />
					))}
					{products.jewlery?.map((item) => (
						<FeatureCard item={item} key={item.itemId} />
					))}
					{products.clothing?.map((item) => (
						<FeatureCard item={item} key={item.itemId} />
					))} */}
					<div className='electronics'>
						<h1>Electronics</h1>
						<Box sx={{flexGrow: 1}}>
							<Grid container spacing={2}>
								{products.electronics?.map((item) => (
									<Grid item xs={6} md={3} key={item.id}>
										<FeatureCard item={item} />
									</Grid>
								))}
							</Grid>
						</Box>
						<div className='cellPhones'>
							<h1>Cell Phones</h1>
							<Box sx={{flexGrow: 1}}>
								<Grid container spacing={2}>
									{products.cellPhones?.map((item) => (
										<Grid item xs={6} md={3} key={item.itemId}>
											<FeatureCard item={item} />
										</Grid>
									))}
								</Grid>
							</Box>
						</div>
						<div className='instruments'>
							<h1>Instruments</h1>
							<Box sx={{flexGrow: 1}}>
								<Grid container spacing={2}>
									{products.instruments?.map((item) => (
										<Grid item xs={6} md={3} key={item.itemId}>
											<FeatureCard item={item} />
										</Grid>
									))}
								</Grid>
							</Box>
							<div className='home'>
								<h1>Jewelry</h1>
								<Box sx={{flexGrow: 1}}>
									<Grid container spacing={2}>
										{products.jewelry?.map((item) => (
											<Grid item xs={6} md={3} key={item.itemId}>
												<FeatureCard item={item} />
											</Grid>
										))}
									</Grid>
								</Box>
								<div className='clothing'>
									<h1>Clothing</h1>
									<Box sx={{flexGrow: 1}}>
										<Grid container spacing={1}>
											{products.clothing?.map((item) => (
												<Grid item xs={6} md={3} key={item.itemId}>
													<FeatureCard item={item} />
												</Grid>
											))}
										</Grid>
									</Box>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default LandingPage;

