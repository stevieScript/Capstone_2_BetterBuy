import React, {useState} from 'react';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar';
// import LoggedInNav from './components/LoggedInNav';
import Api from './api';
// import jwt from 'jsonwebtoken';
import UserContext from './auth/UserContext';
// import jwt_decode from 'jwt-decode';
import {BrowserRouter} from 'react-router-dom';
// import User from './components/User';

function App() {
	// const [infoLoaded, setInfoLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	// const [user, setUser] = useState(() => localStorage.getItem('user') || null);

	// useEffect(() => {
	// 	async function getCurrentUser() {
	// 			try {
	// 				let currentUser = await Api.getUser();
	// 				setCurrentUser(currentUser);
	// 			} catch (err) {
	// 				// console.error('App loadUserInfo: problem loading', err);
	// 				setCurrentUser(null);
	// 			}
	// 		}
	// 		setInfoLoaded(true);
	// 	}
	// 	setInfoLoaded(false);
	// 	getCurrentUser(user);
	// }, []);

	const handleSignup = async (signupData) => {
		try {
			let res = await Api.register(signupData);
			console.log(`handleSignup res: ${res}`);
			// setUser(localStorage.setItem('user', res.id));
			setCurrentUser(res);
			return {success: true};
		} catch (errors) {
			console.error('signup failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogin = async (loginData) => {
		try {
			let user = await Api.login(loginData);
			// setUser(user);
			setCurrentUser(user);
			return {success: true};
		} catch (errors) {
			console.error('login failed', errors);
			return {success: false, errors};
		}
	};

	const handleLogout = () => {
		setCurrentUser(null);
		// setUser(null);
		// localStorage.removeItem('id');
	};
	return (
		<div className='App'>
			<BrowserRouter>
				<UserContext.Provider value={{currentUser, setCurrentUser}}>
					<NavBar />
					{/* <LoggedInNav handleLogout={handleLogout} /> */}
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

