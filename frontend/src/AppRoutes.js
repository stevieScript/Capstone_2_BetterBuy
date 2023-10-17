import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import Product from './components/ProductCard/ProductDetail';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';

function AppRoutes({handleLogin, handleSignup, handleLogout, products, setProducts}) {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login handleLogin={handleLogin} />} />
			<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />
			<Route path='/user' handleLogout={handleLogout} element={<LandingPage />} />
			<Route path='/search/product/:id' element={<Product />} />
			<Route path='/search/:search' element={<SearchResults />} />
			<Route path='*' element={<h1>Not Found</h1>} />
		</Routes>
	);
}

export default AppRoutes;

