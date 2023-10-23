import {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContext from '../../auth/UserContext';
import Api from '../../api';
import {useNavigate} from 'react-router-dom';
import {CircularProgress} from '@mui/material';

function EditProfile() {
	const {currentUser, setCurrentUser} = useContext(UserContext);
	// const [formData, setFormData] = useState();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(null);
	const [infoLoaded, setInfoLoaded] = useState(false);

	useEffect(() => {
		async function getUser() {
			try {
				let user = await Api.getUser(currentUser);

				setFormData(user);
			} catch (err) {
				console.error(err);
			}

			setInfoLoaded(true);
		}

		setInfoLoaded(false);
		getUser();
	}, []);

	const [errors, setErrors] = useState([]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let profileData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
			};
			let updatedUser = await Api.updateUser(currentUser, profileData);
			console.log(updatedUser);
			setFormData((formData) => ({
				...formData,
				password: '',
			}));

			setCurrentUser(updatedUser);
			navigate('/user');
		} catch (err) {
			setErrors(err);
		}
	};

	return !infoLoaded ? (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				fontSize: '24pt',
				fontWeight: 'bold',
			}}>
			<CircularProgress />
		</Box>
	) : (
		<Box sx={{maxWidth: '60%', margin: '3% auto'}}>
			<Typography component='h1' variant='h5'>
				Edit Profile
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit}
				sx={{
					mt: 1,
				}}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete='fname'
							name='firstName'
							required
							fullWidth
							id='firstName'
							label='First Name'
							autoFocus
							value={formData?.firstName}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							autoComplete='lname'
							value={formData?.lastName}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							value={formData?.email}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='new-password'
							value={formData?.password}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{
						mt: 3,
						mb: 2,
					}}>
					Update Profile
				</Button>
			</Box>
		</Box>
	);
}

export default EditProfile;

