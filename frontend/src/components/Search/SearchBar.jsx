import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
// import Api from '../api';
import {Box, Button, IconButton} from '@mui/material';
import Api from '../../api';

function SearchBar() {
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState([]);
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const search = async (searchTerm) => {
		const products = await Api.search(searchTerm);
		setProducts(products);

		navigate(`/search/products/${searchTerm}`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		search(searchTerm);
		setSearchTerm('');
	};

	return (
		<Box
			sx={{
				margin: '.625rem 0',
			}}>
			<form onSubmit={handleSubmit}>
				<TextField
					// id='outlined-basic'
					label='Search'
					color='primary'
					variant='outlined'
					value={searchTerm}
					onChange={handleChange}
					sx={{width: '80%'}}
				/>
				<IconButton type='submit' sx={{p: '.625rem'}}>
					{/* 36 / 16 =  */}
					<SearchIcon sx={{fontSize: '2.25rem'}} />
				</IconButton>
			</form>
		</Box>
	);
}

export default SearchBar;

