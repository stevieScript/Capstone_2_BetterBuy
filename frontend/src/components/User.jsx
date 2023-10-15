import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Api from '../api';

function User() {
	const {currentUser} = useContext(UserContext);
	const [results, setResults] = useState([]);

	// useEffect(() => {
	// 	// This is where I will load top procudts
	// 	const featured = async () => {
	// 		const results = await Api.getFeatured();
	// 		setResults(results);
	// 	};
	// 	featured();
	// }, []);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	const search = async (searchTerm) => {
		const results = await Api.search(searchTerm);
		setResults(results);
	};

	return (
		<Box
			sx={{
				maxWidth: '1200px',
				margin: 'auto',
				padding: '0 10px',
			}}>
			<SearchBar search={search} />
			{results ? (
				<Grid container spacing={{xs: 2, md: 4}} columns={{xs: 12, md: 10}}>
					{results.map((result) => (
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

export default User;

