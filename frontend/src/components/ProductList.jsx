import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
// import {useDispatch} from 'react-redux';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Api from '../api';

function ProductList({products}) {
	const {currentUser} = useContext(UserContext);
	// const [products, setResults] = useState([]);
	// const navigate = useNavigate();

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	// const search = async (searchTerm) => {
	// 	const products = await Api.search(searchTerm);
	// 	setResults(products);
	// 	navigate('/search?search=' + searchTerm, {state: {products: products}});
	// };

	return (
		<Box
			sx={{
				maxWidth: '1200px',
				margin: 'auto',
				padding: '0 10px',
			}}>
			{/* <SearchBar search={search} /> */}
			{products ? (
				<Grid container spacing={{xs: 2, md: 4}} columns={{xs: 12, md: 10}}>
					{products.map((result) => (
						<Grid item xs='auto' sm='auto' md='auto' key={result['itemId']}>
							<ProductCard item={result} />
						</Grid>
					))}
				</Grid>
			) : (
				<p> Sorry, no results found</p>
			)}
		</Box>
	);
}

export default ProductList;

