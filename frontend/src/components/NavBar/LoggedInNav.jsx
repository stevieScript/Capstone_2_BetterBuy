import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import {useState, useContext} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../Cart/Cart';
import CategorySideMenu from '../Categories/CategorySideMenu';
import './LoggedInNav.css';
import UserContext from '../../auth/UserContext';
import {useNavigate} from 'react-router-dom';
import Api from '../../api';

export default function LoggedInNav() {
	const {setCurrentUser} = useContext(UserContext);
	const [openCart, setOpenCart] = useState(false);
	const [openSideMenu, setOpenSideMenu] = useState(false);
	const products = useSelector((state) => state.cart.products);
	const navigate = useNavigate();
	const handleLogout = async () => {
		await Api.logout();
		setCurrentUser(null);
		// localStorage.removeItem('user');
	};

	return (
		<Box>
			<AppBar position='static'>
				<Toolbar>
					<Box
						color='inherit'
						sx={{mr: 1, ml: 1}}
						className='menuIcon'
						onClick={() => setOpenSideMenu(!openSideMenu)}>
						<MenuIcon sx={{cursor: 'pointer'}} />
					</Box>
					<Box marginRight='auto'>
						<Button onClick={() => navigate('/user')} color='inherit' sx={{ml: 3}}>
							BetterBuy
						</Button>
					</Box>
					<Button marginleft='auto' color='inherit' onClick={handleLogout}>
						Logout
					</Button>
					<Button color='inherit' sx={{ml: 1, mr: 1}} onClick={() => navigate('/edit')}>
						Profile
					</Button>
					<Box
						color='inherit'
						sx={{mr: 3, ml: 1}}
						className='cartIcon'
						onClick={() => setOpenCart(!openCart)}>
						<ShoppingCartIcon />
						<span className='count'>{products.length}</span>
					</Box>
				</Toolbar>
			</AppBar>
			{openCart && <Cart />}
			{openSideMenu && <CategorySideMenu />}
		</Box>
	);
}

