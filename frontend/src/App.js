import React, {useState, useEffect} from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar';
import Api from './api';
// import jwt from 'jsonwebtoken';
import UserContext from './auth/UserContext';
import jwt_decode from 'jwt-decode';
import {BrowserRouter} from 'react-router-dom';
import User from './components/User';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState(() => localStorage.getItem('token') || null);

	useEffect(() => {
		async function getCurrentUser() {
			if (token) {
				try {
					let {email} = jwt_decode(token);
					Api.token = token;
					let currentUser = await Api.getUser(email);
					setCurrentUser(currentUser);
				} catch (err) {
					console.error('App loadUserInfo: problem loading', err);
					setCurrentUser(null);
				}
			}
			setInfoLoaded(true);
		}
		setInfoLoaded(false);
		getCurrentUser(token);
	}, [token]);

	const handleLogin = async (loginData) => {
		try {
			let token = await Api.login(loginData);
			setToken(token);
			return {success: true};
		} catch (errors) {
			console.error('login failed', errors);
			return {success: false, errors};
		}
	};

	const handleSignup = async (signupData) => {
		try {
			let token = await Api.register(signupData);
			setToken(token);
			return {success: true};
		} catch (errors) {
			console.error('signup failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogout = () => {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	};
	return (
		<div className='App'>
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, setCurrentUser}}>
					<NavBar />
					<AppRoutes
						handleLogin={handleLogin}
						handleLogout={handleLogout}
						handleSignup={handleSignup}
					/>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

