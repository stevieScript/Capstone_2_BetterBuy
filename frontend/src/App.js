import React, {useState, useEffect} from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar';
// import LoggedInNav from './components/LoggedInNav';
import LoadingSpinner from './common/LoadingSpinner';
import Api from './api';
import UserContext from './auth/UserContext';
import {BrowserRouter} from 'react-router-dom';
// import {createTheme, ThemeProvider} from '@mui/material/';
// import User from './components/User';
import './App.css';
// import {Box} from '@mui/system';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState(() => {
		try {
			const storedUser = localStorage.getItem('user');
			return storedUser ? JSON.parse(storedUser) : null;
		} catch (error) {
			console.error('Error parsing user from localStorage:', error);
			return null;
		}
	});

	useEffect(() => {
		async function getCurrentUser() {
			if (user) {
				try {
					let currentUser = await Api.getUser(user);
					setCurrentUser(currentUser);
				} catch (err) {
					console.error('App loadUserInfo: problem loading', err);
					setCurrentUser(null);
				}
			}
			setInfoLoaded(true);
		}
		setInfoLoaded(false);
		getCurrentUser();
	}, []);

	const handleSignup = async (signupData) => {
		try {
			let res = await Api.register(signupData);
			setCurrentUser(res.id);
			return {success: true};
		} catch (errors) {
			console.error('signup failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogin = async (loginData) => {
		try {
			let user = await Api.login(loginData);
			if (user) {
				setUser(user);
				setCurrentUser(user);
				localStorage.setItem('user', JSON.stringify(user));
				return {success: true};
			}
		} catch (errors) {
			console.error('login failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogout = async () => {
		await Api.logout();
		setCurrentUser(null);
		setUser(null);
		localStorage.removeItem('user');
		// <Navigate to='/' />;
	};
	return (
		<>
			{/* <ThemeProvider theme={darkTheme}> */}
			{/* mode={mode} setMode={setMode} */}
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, setCurrentUser}}>
					{/* <Box bgcolor={'background.default'} color={'text.primary'}> */}
					<NavBar handleLogout={handleLogout} />
					<div className='App'>
						<AppRoutes
							handleLogin={handleLogin}
							handleLogout={handleLogout}
							handleSignup={handleSignup}
							products={products}
							setProducts={setProducts}
						/>
					</div>
					{/* </Box> */}
				</UserContext.Provider>
			</BrowserRouter>
			{/* </ThemeProvider> */}
		</>
	);
}

export default App;

