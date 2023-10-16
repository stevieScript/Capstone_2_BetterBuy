import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Product from './components/ProductCard/ProductDetail';

function AppRoutes({handleLogin, handleSignup, handleLogout}) {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login handleLogin={handleLogin} />} />
			<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
			<Route path='/user' handleLogout={handleLogout} element={<User />} />
			<Route path='/search/:id' element={<Product />} />
			<Route path='/search?' element={<User />} />
			<Route path='*' element={<h1>Not Found</h1>} />
		</Routes>
	);
}

export default AppRoutes;

