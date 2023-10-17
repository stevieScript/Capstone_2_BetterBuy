import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Navigate} from 'react-router-dom';
import UserContext from '../../auth/UserContext';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../SearchBar';
import Api from '../../api';
import Cart from '../Cart/Cart';
import './LoggedInNav.css';

export default function LoggedInNav({handleLogout}) {
	const [open, setOpen] = useState(false);
	const products = useSelector((state) => state.cart.products);
	// const [results, setResults] = useState([]);
	// const navigate = useNavigate();

	const {currentUser} = useContext(UserContext);
	// const search = async (searchTerm) => {
	// 	const products = await Api.search(searchTerm);
	// 	setResults(products);
	// 	navigate('/search?search=' + searchTerm, {state: {products: products}});
	// };
	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<Box>
			<AppBar position='static'>
				<Toolbar>
					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ml: 2}}>
						<MenuIcon />
					</IconButton>
					<Box marginRight='auto'>
						<Button href='/' variant='text' color='inherit'>
							BetterBuy
						</Button>
					</Box>
					{/* <SearchBar search={search} /> */}
					<Button marginleft='auto' color='inherit' onClick={handleLogout}>
						Logout
					</Button>
					<Button color='inherit' href='/signup'>
						Profile
					</Button>
					<Box
						color='inherit'
						sx={{mr: 3, ml: 1}}
						className='cartIcon'
						onClick={() => setOpen(!open)}>
						<ShoppingCartIcon />
						<span className='count'>{products.length}</span>
					</Box>
				</Toolbar>
			</AppBar>
			{open && <Cart />}
		</Box>
	);
}

