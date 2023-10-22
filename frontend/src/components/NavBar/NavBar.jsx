import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default function NavBar() {
	const user = JSON.parse(localStorage.getItem('user'));

	return user ? <LoggedInNav /> : <LoggedOutNav />;
}

