import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Switch} from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
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

function CategorySideMenu({mode, setMode}) {
	// let links = categoryLinks();
	return (
		<div className='sideMenu'>
			<h1>Top Categories:</h1>
			<div className='category-links'>{categoryLinks()}</div>
			{/* <ModeNightIcon />
			<Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} /> */}
		</div>
	);
}

export default CategorySideMenu;

