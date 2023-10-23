import React, {useState, useEffect} from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import Api from './api';
import UserContext from './auth/UserContext';
import {BrowserRouter} from 'react-router-dom';
import {setUserId} from './redux/cartReducer';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {Box, CircularProgress} from '@mui/material';
import {set} from '../../backend/app';

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.cart.userId);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState(() => {
		try {
			const storedUser = localStorage.getItem('token');
			return storedUser ? JSON.parse(storedUser) : null;
		} catch (error) {
			console.error('Error parsing user from localStorage:', error);
			return null;
		}
	});
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	useEffect(() => {
		async function getCurrentUser() {
			if (user) {
				try {
					let currentUser = await Api.getUser(user);
					setCurrentUser(currentUser);
					setToken(currentUser.token);
				} catch (err) {
					console.error('App loadUserInfo: problem loading', err);
					setCurrentUser(null);
				}
			}
			setInfoLoaded(true);
		}
		setInfoLoaded(false);
		getCurrentUser();
	}, [token]);

	const handleSignup = async (signupData) => {
		try {
			let res = await Api.register(signupData);
			console.log('res', res);
			setToken(res.token);
			setCurrentUser(res.id);
			dispatch(setUserId(res.id));
			return {success: true};
		} catch (errors) {
			console.error('signup failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogin = async (loginData) => {
		try {
			let res = await Api.login(loginData);
			if (user) {
				console.log('user', res.user);
				setCurrentUser(res.user);
				dispatch(setUserId(res.user));
				setToken(res.token);
				return {success: true};
			}
		} catch (errors) {
			console.error('login failed', errors);
			return {success: false, errors};
		}
	};

	const logout = async () => {
		await Api.logout();
		setCurrentUser(null);
		// setUser(null);
		setToken(null);
	};
	return !infoLoaded ? (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				fontSize: '24pt',
				fontWeight: 'bold',
			}}>
			<CircularProgress />
		</Box>
	) : (
		<>
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, setCurrentUser}}>
					<NavBar logout={logout} />
					<div className='App'>
						<AppRoutes handleLogin={handleLogin} handleSignup={handleSignup} />
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</>
	);
}

export default App;

