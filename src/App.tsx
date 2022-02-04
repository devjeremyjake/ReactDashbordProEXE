import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as RouteLink from './helpers/Routes';

// Pages import
const HomePage = React.lazy(() => import('./pages/Home/Home'));
const AddPage = React.lazy(() => import('./pages/AddUser'));

const App = () => {
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
			</Routes>
		</BrowserRouter>
		// <>
		// 	<Home />
		// </>
	);
};

export default App;
