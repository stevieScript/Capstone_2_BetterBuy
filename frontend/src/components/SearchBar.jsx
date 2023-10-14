import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Box, Button} from '@mui/material';

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
		<Box>
			<form onSubmit={handleSubmit}>
				<TextField
					// id='outlined-basic'
					label='Search'
					color='secondary'
					variant='outlined'
					value={searchTerm}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					variant='contained'
					endIcon={<SearchIcon />}
					size='small'
					color='primary'>
					Search
				</Button>
			</form>
		</Box>
	);
}

export default SearchBar;

