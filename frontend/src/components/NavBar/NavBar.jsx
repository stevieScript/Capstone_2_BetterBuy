import React, {useContext} from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import UserContext from '../../auth/UserContext';

export default function NavBar({handleLogout, mode, setMode}) {
	const {currentUser} = useContext(UserContext);
	return currentUser ? (
		<LoggedInNav handleLogout={handleLogout} mode={mode} setMode={setMode} />
	) : (
		<LoggedOutNav />
	);
}

