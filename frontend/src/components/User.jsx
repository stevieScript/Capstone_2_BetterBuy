import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
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
		console.log(results);
		setResults(results);
	};

	return (
		<div>
			<SearchBar search={search} />
			{results ? (
				<div>
					{results.map((result, i) => (
						<ProductCard key={result['itemId']} item={result} />
					))}
				</div>
			) : (
				<p> Sorry, no results found</p>
			)}
		</div>
	);
}

export default User;

