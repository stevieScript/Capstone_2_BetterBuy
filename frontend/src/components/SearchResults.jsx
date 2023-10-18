import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Api from '../api';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

function SearchResults() {
	const {search} = useParams();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const searchProducts = async () => {
			const products = await Api.search(search);
			setProducts(products);
		};
		searchProducts();
	}, [search]);

	return (
		<div>
			<SearchBar />
			<ProductList products={products} />
		</div>
	);
}

export default SearchResults;

