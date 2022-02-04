import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersFetch } from '../../redux/features/userActionsSlice';
import { selectUsers } from '../../redux/store';

import './Home.styles.css';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(usersFetch());
	}, [dispatch]);

	const { users, loading } = useSelector(selectUsers);
	console.log(loading, users);

	return (
		<div className="home">
			<h3 className="home__heading">Dashboard</h3>
			<div className="home__content">
				<div className="home__contentTop">
					<p>Users List</p>
					<button onClick={() => navigate('/add-new', { replace: true })}>
						Add New
					</button>
				</div>
				<div className="home__contentTable">Table</div>
			</div>
		</div>
	);
};

export default Home;
