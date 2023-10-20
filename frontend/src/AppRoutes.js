import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/ProductCard/ProductDetail';
import LandingPage from './components/LandingPage';
import SearchResults from './components/SearchResults';
import PrivateRoute from './PrivateRoute';
import EditProfile from './components/EditProfile';

function AppRoutes({handleLogin, handleSignup, handleLogout, products, setProducts}) {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login handleLogin={handleLogin} />} />
			<Route path='/signup' element={<Signup handleSignup={handleSignup} />} />

			<Route
				path='/user'
				element={<PrivateRoute element={<LandingPage handleLogout={handleLogout} />} />}
			/>
			<Route
				path='/edit'
				element={<PrivateRoute element={<EditProfile handleLogout={handleLogout} />} />}
			/>
			<Route
				path='/checkout?success=true'
				element={<PrivateRoute element={<LandingPage handleLogout={handleLogout} />} />}
			/>

			<Route path='/search/product/:id' element={<PrivateRoute element={<Product />} />} />

			<Route
				path='/search/products/:search'
				element={<PrivateRoute element={<SearchResults />} />}
			/>
			<Route path='/search/category/:id' element={<PrivateRoute element={<SearchResults />} />} />

			<Route path='*' element={<h1>Page Not Found</h1>} />
		</Routes>
	);
}

export default AppRoutes;

