import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Api from '../../api';
import SearchBar from './SearchBar';
import ProductList from '../ProductCard/ProductList';
import {Box, CircularProgress} from '@mui/material';

function SearchResults() {
	const {search, id} = useParams();
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const searchProducts = async () => {
			let products;
			if (id) {
				products = await Api.getByCategoryID(id);
				setLoading(false);
			} else {
				products = await Api.search(search);
				setLoading(false);
			}
			if (products) {
				setProducts(products);
			}
		};
		searchProducts();
		setLoading(true);
	}, [search, id]);

	return (
		<div>
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
					<SearchBar />
					{search && (
						<h1>
							Search Results for: {search}
							{/* <hr style={{width: '100%', border: '1px solid black', marginBottom: '5px'}} /> */}
						</h1>
					)}

					<ProductList products={products} />
				</>
			)}
		</div>
	);
}

export default SearchResults;

