import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';

function AppRoutes({handleLogin, handleSignup, handleLogout}) {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
			<Route path='/user' element={<User />} />
		</Routes>
	);
}

export default AppRoutes;

