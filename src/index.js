import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

ReactDOM.render(
	<Router>
		<Auth0ProviderWithHistory redirectUri>
			<App />
		</Auth0ProviderWithHistory>
	</Router>,
	document.getElementById('root')
);
