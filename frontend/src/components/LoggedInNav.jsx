import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';

export default function LoggedInNav() {
	// const navigate = useNavigate();
	const {currentUser} = useContext(UserContext);
	if (!currentUser) {
		return <Navigate to='/' />;
	}
	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static'>
				<Toolbar>
					{/* <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{mr: 2}}>
						<MenuIcon />
					</IconButton> */}
					<Box marginRight='auto'>
						<Button href='/' variant='text' color='inherit'>
							BetterBuy
						</Button>
					</Box>
					<Button color='inherit' href='/logout'>
						Logout
					</Button>
					<Button color='inherit' href='/signup'>
						Profile
					</Button>
					<IconButton color='inherit' href='/cart'>
						<ShoppingCartIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

