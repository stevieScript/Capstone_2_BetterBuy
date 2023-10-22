import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import UserContext from './auth/UserContext';

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({element}) {
	const user = useSelector((state) => state.cart.userId);
	const {currentUser} = useContext(UserContext);

	// const dispatch = useDispatch();
	// const user = localStorage.getItem('user');

	console.debug('PrivateRoute', 'currentUser=', currentUser);

	if (!user || !currentUser) {
		return <Navigate to='/login' />;
	}

	return element;
}

export default PrivateRoute;

