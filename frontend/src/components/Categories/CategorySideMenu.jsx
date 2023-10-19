import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './SideMenu.css';

let ids = {
	Business: 12576,
	Cameras: 625,
	CellPhones: 9355,
	Clothing: 11450,
	Electronics: 293,
	Home: 1277,
	Instruments: 165255,
	Health: 21136,
};

function categoryLinks() {
	let links = [];
	for (let key in ids) {
		links.push(
			<Link key={key} to={`/search/category/${ids[key]}`}>
				<h1>{key}</h1>
			</Link>
		);
	}
	return links;
}

function CategorySideMenu() {
	// let links = categoryLinks();
	return (
		<div className='sideMenu'>
			<h1>Top Categories:</h1>
			<div className='category-links'>{categoryLinks()}</div>
			{/* <h1>testing</h1> */}
		</div>
	);
}

export default CategorySideMenu;

