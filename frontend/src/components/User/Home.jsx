import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../../auth/UserContext';
import {Typography, Button, Box, ButtonGroup} from '@mui/material';
import {useSelector} from 'react-redux';
function Home() {
	const {currentUser} = useContext(UserContext);
	const user = useSelector((state) => state.cart.user);

	if (user || currentUser) {
		return <Navigate to='/user' />;
	}

	return (
		<Box
			sx={
				{
					// border: '2px solid black',
					// display: 'flex',
					// flexDirection: 'column',
					// alignItems: 'center',
					// justifyContent: 'center',
				}
			}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '0 auto',
					height: '100vh',
					// border: '2px solid black',
				}}>
				<Typography variant='h6' gutterBottom>
					Welcome to Better Buy. Log in or sign up to get started.
				</Typography>
				<ButtonGroup>
					<Button variant='contained' color='primary' href='/login'>
						Login
					</Button>
					<Button variant='contained' color='primary' href='/signup'>
						Sign up
					</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}

export default Home;

