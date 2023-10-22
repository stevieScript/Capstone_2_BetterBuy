import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import UserContext from '../../auth/UserContext';
import {useContext} from 'react';
export default function NavBar({logout}) {
	const {currentUser} = useContext(UserContext);

	return currentUser ? <LoggedInNav logout={logout} /> : <LoggedOutNav />;
}

