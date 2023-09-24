import React from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar';
import {BrowserRouter} from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<NavBar />
				<AppRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;

