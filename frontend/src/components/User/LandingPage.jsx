import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {getLandingPage} from '../../helpers/helpers';
import FeatureCard from '../FeaturedProducts/FeatureCard';
import {Link} from 'react-router-dom';
import {resetCart} from '../../redux/cartReducer';
import {useDispatch} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

function LandingPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const param = new URLSearchParams(window.location.search);
		const status = param.get('success');
		async function getProducts() {
			const products = await getLandingPage();
			setProducts(products);
			setLoading(false);
		}
		//clear cart after redirect from stripe
		if (status === 'true') {
			dispatch(resetCart());
		}
		getProducts();
	}, [dispatch]);

	const search = async (searchTerm) => {
		navigate(`/search/products/${searchTerm}`);
	};
	return (
		<div className='main'>
			{loading ? (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
						fontSize: '24pt',
						fontWeight: 'bold',
					}}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<SearchBar search={search} />
					<div className='electronics'>
						<Link to='/search/category/293'>
							<h1>Electronics</h1>
						</Link>
						<Box sx={{flexGrow: 1}}>
							<Grid container spacing={2}>
								{products.electronics?.map((item) => (
									<Grid item xs={6} md={3} key={item.itemId}>
										<FeatureCard item={item} />
									</Grid>
								))}
							</Grid>
						</Box>
						<div />
						<div className='cellPhones'>
							<Link to='/search/category/9355'>
								<h1>Cell Phones</h1>
							</Link>
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
							<Link to='/search/category/165255'>
								<h1>Instruments</h1>
							</Link>
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
								<Link to='/search/category/1527'>
									<h1>Jewelry</h1>
								</Link>
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
									<Link to='/search/category/11450'>
										<h1>Cell Phones</h1>
									</Link>
									<Box sx={{flexGrow: 1}}>
										<Grid container spacing={2}>
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

