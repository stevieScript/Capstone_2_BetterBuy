import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';

function AppRoutes({handleLogin, handleSignup, handleLogout}) {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login handleLogin={handleLogin} />} />
			<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
			<Route path='/user' handleLogout={handleLogout} element={<User />} />
		</Routes>
	);
}

export default AppRoutes;

