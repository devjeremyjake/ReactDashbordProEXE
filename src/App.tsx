import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as RouteLink from './helpers/Routes';

import { usersFetch } from './redux/features/userActionsSlice';
// Pages import
const HomePage = React.lazy(() => import('./pages/Home/Home'));
const AddPage = React.lazy(() => import('./pages/AddUser/AddUser'));
const EditUser = React.lazy(() => import('./pages/EditUser/EditUser'));

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(usersFetch());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={RouteLink.Home}
					element={
						<React.Suspense fallback={<>...</>}>
							<HomePage />
						</React.Suspense>
					}
				/>
				<Route
					path={RouteLink.AddNew}
					element={
						<React.Suspense fallback={<>...</>}>
							<AddPage />
						</React.Suspense>
					}
				/>
				<Route
					path={RouteLink.EditUser}
					element={
						<React.Suspense fallback={<>...</>}>
							<EditUser />
						</React.Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
