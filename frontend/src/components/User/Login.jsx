import {useState} from 'react';
import Alert from '../../common/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';

export default function SignIn({handleLogin}) {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState([]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let result = await handleLogin(formData);
			if (result.success) {
				navigate('/user');
			} else {
				setErrors(result.errors);
			}
		} catch (e) {
			setErrors(e);
		}
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	return (
		<div>
			{errors.length ? <Alert type='danger' messages={errors} /> : null}
			{/* // <ThemeProvider theme={defaultTheme}> */}
			<Container component='main' maxWidth='xs'>
				{errors.length ? (
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Typography component='h1' variant='h5'>
							<div>{errors}</div>
						</Typography>
					</Box>
				) : null}
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							onChange={handleChange}
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							onChange={handleChange}
							autoComplete='current-password'
						/>

						<Button type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/signup' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			{/* // </ThemeProvider> */}
		</div>
	);
}

