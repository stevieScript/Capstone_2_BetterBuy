import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Api from '../../api';
import SearchBar from '../SearchBar';
import ProductList from '../ProductCard/ProductList';
import {Box, CircularProgress} from '@mui/material';

function CategoryPage() {
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const searchProducts = async () => {
			const products = await Api.getByCategoryID(id);
			setProducts(products);
			setLoading(false);
		};
		searchProducts();
		setLoading(true);
	}, [id]);

	return (
		<Box>
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
				<div>
					<SearchBar />
					<ProductList products={products} />
				</div>
			)}
		</Box>
	);
}

export default CategoryPage;

