import * as React from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
	const {currentUser} = useContext(UserContext);
	if (currentUser) {
		return <LoggedInNav />;
	} else {
		return <LoggedOutNav />;
	}

	// return (
	// 	// <Box sx={{flexGrow: 1}}>
	// 	// 	<AppBar position='static'>
	// 	// 		<Toolbar>
	// 	// 			{/* <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{mr: 2}}>
	// 	// 				<MenuIcon />
	// 	// 			</IconButton> */}
	// 	// 			<Box marginRight='auto'>
	// 	// 				<Button href='/' variant='text' color='inherit'>
	// 	// 					BetterBuy
	// 	// 				</Button>
	// 	// 			</Box>
	// 	// 			<Button color='inherit' href='/login'>
	// 	// 				Login
	// 	// 			</Button>
	// 	// 			<Button color='inherit' href='/signup'>
	// 	// 				Sign Up
	// 	// 			</Button>
	// 	// 		</Toolbar>
	// 	// 	</AppBar>
	// 	// </Box>
	// );
}

