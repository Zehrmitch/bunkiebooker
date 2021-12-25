import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<button
			className="text-xs font-medium text-gray-500 hover:text-gray-700 bg-red-300 py-2 px-4 rounded"
			onClick={() => logout({ returnTo: window.location.origin })}
		>
			Log Out
		</button>
	);
};

export default LogoutButton;
