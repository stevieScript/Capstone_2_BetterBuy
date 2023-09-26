import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {Typography, Button, Box, ButtonGroup} from '@mui/material';
function Home() {
	const {currentUser} = useContext(UserContext);
	if (currentUser) {
		return <Navigate to='/user' />;
	}
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
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

