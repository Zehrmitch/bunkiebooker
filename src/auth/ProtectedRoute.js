import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from '../pages/LandingPage';

const ProtectedRoute = ({ component, ...args }) => {
	const { isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		return (
			<Route
				element={withAuthenticationRequired(component, {
					onRedirecting: () => <Loading />,
				})}
				{...args}
			/>
		);
	} else {
		return <Navigate to="/" />;
	}
};

export default ProtectedRoute;
