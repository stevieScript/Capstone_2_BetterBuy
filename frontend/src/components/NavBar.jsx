import React, {useContext} from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import UserContext from '../auth/UserContext';

export default function NavBar() {
	const {currentUser} = useContext(UserContext);
	return currentUser ? <LoggedInNav /> : <LoggedOutNav />;
}

