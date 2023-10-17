import React, {useEffect, useState} from 'react';

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

function LandingPage() {
	const {currentUser} = useContext(UserContext);
	const [products, setProducts] = useState([]);
	const [electronics, setElectronics] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function getProducts() {
			const products = await Api.getProducts();
			setProducts(products);
		}
		getProducts();
	});

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
			<SearchBar search={search} />
			<div className='electronics'>
				<h1>Electronics</h1>
			</div>
		</div>
	);
}

export default LandingPage;

