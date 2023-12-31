import ProductCard from './ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import {Navigate} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
// import UserContext from '../auth/UserContext';
// import {useContext} from 'react';
// import {useDispatch} from 'react-redux';
// import SearchBar from './SearchBar';

// import Api from '../api';

function ProductList({products}) {
	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={2}>
				{products.map((result) => (
					<Grid item xs={12} sm={8} md={6} lg={5} key={result.itemId}>
						<ProductCard item={result} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default ProductList;

