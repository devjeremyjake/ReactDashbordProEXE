import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Validation from '../AddUser/Validation';
import { editUser } from '../../redux/features/userActionsSlice';
import { selectUsers } from '../../redux/store';
import './EditUser.styles.css';

const EditUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userSingle } = useSelector(selectUsers);

	interface addModel {
		name: string;
		email: string;
		username: string;
		city: string;
		id: number;
	}

	const [data, setData] = useState<addModel>({
		name: '',
		email: '',
		username: '',
		city: '',
		id: 0,
	});
	const [errors, setErrors] = useState<any>({});

	useEffect(() => {
		setData({
			id: !userSingle.id || userSingle.id,
			name: !userSingle?.name ? '' : userSingle?.name,
			email: !userSingle?.email ? '' : userSingle?.email,
			username: !userSingle?.username ? '' : userSingle?.username,
			city: !userSingle?.address?.city ? '' : userSingle?.address?.city,
		});
	}, []);

	// Stringify the Data values
	const { name, email, username, city, id } = data;

	//Check if field is present the submit
	useEffect(() => {
		if (
			Object.keys(errors).length === 0 &&
			data.name !== '' &&
			data.email !== ''
		) {
			dispatch(
				editUser({
					id,
					name,
					email,
					username,
					address: { city },
				})
			);
			navigate('/', { replace: true });
		}
	}, [errors]);

	// Change input field
	const handleChange = (e: React.FormEvent) => {
		const { name, value } = e.target as HTMLTextAreaElement;
		setData({ ...data, [name]: value });
	};

	// HandleFormSubmit
	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(Validation(data));
	};

	return (
		<div className="editUser">
			<h3>Form</h3>
			<div className="editUser__content">
				<div className="editUser__formContent">
					<label htmlFor="name">Name</label>
					<div>
						<input
							type="text"
							placeholder="Enter FullName"
							name="name"
							value={data.name}
							id="name"
							onChange={handleChange}
						/>
						{errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
					</div>
				</div>
				<div className="editUser__formContent">
					<label htmlFor="email">Email</label>
					<div>
						<input
							type="email"
							placeholder="Enter E-mail"
							name="email"
							value={data.email}
							id="email"
							onChange={handleChange}
						/>
						{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
					</div>
				</div>
				<div className="editUser__formContent">
					<label htmlFor="username">Username</label>
					<div>
						<input
							type="text"
							placeholder="Enter Username"
							name="username"
							id="username"
							value={data.username}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="editUser__formContent">
					<label htmlFor="city">City</label>
					<div>
						<input
							type="text"
							placeholder="Enter City"
							name="city"
							id="city"
							value={data.city}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="editUser__buttons">
					<button onClick={() => navigate('/', { replace: true })}>
						Cancel
					</button>
					<button onClick={(e) => submitForm(e)}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
