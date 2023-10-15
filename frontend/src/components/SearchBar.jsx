import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Box, Button, IconButton} from '@mui/material';

function SearchBar({search}) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		search(searchTerm);
		setSearchTerm('');
	};

	return (
		<Box
			sx={{
				margin: '10px 0',
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
				<IconButton type='submit' sx={{p: '10px'}}>
					<SearchIcon sx={{fontSize: '36px'}} />
				</IconButton>
			</form>
		</Box>
	);
}

export default SearchBar;

