import React from 'react';
import {Navigate} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
// import {useDispatch} from 'react-redux';
// import SearchBar from './SearchBar';
import ProductCard from './ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import Api from '../api';

function ProductList({products}) {
	const {currentUser} = useContext(UserContext);
	// const [data, setResults] = useState([]);
	// const navigate = useNavigate();

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	// const search = async (searchTerm) => {
	// 	const products = await Api.search(searchTerm);
	// 	setResults(data);
	// 	navigate('/search?search=' + searchTerm, {state: {products: products}});

	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={2}>
				{products.map((result) => (
					<Grid item xs={10} sm={7} md={6} key={result['itemId']}>
						<ProductCard item={result} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default ProductList;

