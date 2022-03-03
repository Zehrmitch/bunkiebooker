import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';
import LandingPage from './pages/LandingPage.js';
import ListingsPage from './pages/ListingsPage';
import SpaceOverviewPage from './pages/SpaceOverviewPage';
import NotFoundPage from './pages/NotFoundPage';
import SideNavPage from './pages/SideNavPage';
import NewSpacePage from './pages/NewSpacePage';
import HomePage from './pages/HomePage.js';
import Calendar from './pages/Calendar';
import PaymentPage from './pages/PaymentPage';
import ImageUpload from './pages/ImageUpload';

function App() {
	const { isLoading, error } = useAuth0();

	if (isLoading) {
		return <Loading />;
	} else if (error) {
		return <div>Oops... {error.message}</div>;
	} else {
		return (
			<Routes>
				<Route path='/' element={<LandingPage />}></Route>
				<Route path='app' element={<SideNavPage />}>
					<Route path='home' element={<HomePage />}></Route>
					<Route
						path='listings'
						exact
						element={<ListingsPage />}
					></Route>
					<Route path='uploadImage' element={<ImageUpload />}></Route>
					<Route path='payment/:id' element={<PaymentPage />}></Route>
					<Route path='calendar' element={<Calendar />}></Route>
					<Route
						path='space/:id'
						element={<SpaceOverviewPage />}
					></Route>
					<Route
						path='new/space'
						exact
						element={<NewSpacePage />}
					></Route>
					<Route path='*' element={<NotFoundPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		);
	}
}

export default App;
