import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Api from '../api';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

function SearchResults() {
	const {search, id} = useParams();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const searchProducts = async () => {
			let products;
			if (id) {
				products = await Api.getByCategoryID(id);
			} else {
				products = await Api.search(search);
			}
			if (products) {
				setProducts(products);
			}
		};
		searchProducts();
	}, [search, id]);

	return (
		<div>
			<SearchBar />
			{search && (
				<h1>
					Search Results for: {search}
					<hr style={{width: '100%', border: '1px solid black', marginBottom: '5px'}} />
				</h1>
			)}

			<ProductList products={products} />
		</div>
	);
}

export default SearchResults;

