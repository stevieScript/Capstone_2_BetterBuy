import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Api from '../api';
import SearchBar from './SearchBar';
import ProductList from './ProductList';

function CategoryPage() {
	const {id} = useParams();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const searchProducts = async () => {
			const products = await Api.getByCategoryID(id);
			setProducts(products);
		};
		searchProducts();
	}, [id]);

	return (
		<div>
			<SearchBar />
			<ProductList products={products} />
		</div>
	);
}

export default CategoryPage;

