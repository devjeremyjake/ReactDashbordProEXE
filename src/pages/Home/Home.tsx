import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import {
	reloadUser,
	deleteUser,
	editUserFetch,
} from '../../redux/features/userActionsSlice';
import { selectUsers } from '../../redux/store';
import './Home.styles.css';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { users } = useSelector(selectUsers);

	useEffect(() => {
		dispatch(reloadUser());
	}, [dispatch]);

	// Delete actions
	const processDelete = (cellValue: any) => {
		console.log(cellValue);
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteUser(cellValue.row.id));
				dispatch(reloadUser());
			}
		});
	};

	// Activate Edit User
	const processEdit = (e: React.FormEvent, cellValue: any) => {
		e.preventDefault();
		dispatch(editUserFetch(cellValue.row.id));
		navigate('/edit-user', { replace: true });
	};

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
				<div style={{ height: 600, width: '100%', padding: '30px' }}>
					<div style={{ flexGrow: '1', width: '100%', height: '100%' }}>
						<DataGrid
							getRowId={(r) => r.id}
							rows={users}
							columns={[
								{
									field: 'ID',
									width: 100,
									renderCell: (cellValue) => {
										return (
											<>
												<p>{cellValue.row.id}</p>
											</>
										);
									},
								},
								{
									field: 'name',
									width: 190,
									renderCell: (cellValue) => {
										return (
											<>
												<p>{cellValue.row.name}</p>
											</>
										);
									},
								},
								{
									field: 'Username',
									width: 150,
									renderCell: (cellValue) => {
										return (
											<>
												<p>{cellValue.row.username}</p>
											</>
										);
									},
								},
								{
									field: 'City',
									width: 150,
									renderCell: (cellValue) => {
										return (
											<>
												<p>{cellValue.row.address.city}</p>
											</>
										);
									},
								},
								{
									field: 'Email',
									width: 250,
									renderCell: (cellValue) => {
										return (
											<>
												<p>{cellValue.row.email}</p>
											</>
										);
									},
								},
								{
									field: 'Edit',
									width: 150,
									renderCell: (cellValue) => {
										return (
											<>
												<button
													style={{
														padding: '6px 20px',
														border: 'none',
														color: '#fff',
														backgroundColor: '#ffa600',
														borderRadius: '5px',
													}}
													onClick={(e) => processEdit(e, cellValue)}
												>
													Edit
												</button>
											</>
										);
									},
								},
								{
									field: 'Delete',
									width: 150,
									renderCell: (cellValue) => {
										return (
											<>
												<button
													style={{
														padding: '6px 20px',
														border: 'none',
														color: '#fff',
														backgroundColor: '#ff0000',
														borderRadius: '5px',
														outline: 'none',
													}}
													onClick={() => processDelete(cellValue)}
												>
													Delete
												</button>
											</>
										);
									},
								},
							]}
							pageSize={20}
							rowsPerPageOptions={[20]}
							disableSelectionOnClick
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
