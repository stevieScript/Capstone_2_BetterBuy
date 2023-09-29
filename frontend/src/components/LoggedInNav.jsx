import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import {alpha, styled} from '@mui/material/styles';
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

	const Search = styled('div')(({theme}) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	}));

	const SearchIconWrapper = styled('div')(({theme}) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	const StyledInputBase = styled(InputBase)(({theme}) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
	}));
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
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder='Search…' inputProps={{'aria-label': 'search'}} />
					</Search>
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

