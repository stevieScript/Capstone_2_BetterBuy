import React, {useState, useEffect} from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar';
import LoadingSpinner from './common/LoadingSpinner';
import Api from './api';
import UserContext from './auth/UserContext';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
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

	// const handleLogout = async () => {
	// 	await Api.logout();
	// 	setCurrentUser(null);
	// 	setUser(null);
	// 	localStorage.removeItem('user');
	// };
	return !infoLoaded ? (
		<LoadingSpinner />
	) : (
		<>
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, setCurrentUser}}>
					<NavBar />
					<div className='App'>
						<AppRoutes
							handleLogin={handleLogin}
							// handleLogout={handleLogout}
							handleSignup={handleSignup}
						/>
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
}

export default App;

