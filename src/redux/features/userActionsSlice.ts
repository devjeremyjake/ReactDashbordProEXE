import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../helpers/model';

export const usersFetch = createAsyncThunk('user/fetch', async () => {
	try {
		const response = await axios.get(
			'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'
		);
		return response.data;
	} catch (error: any) {
		console.warn(error.message);
	}
});

interface UsersListSliceState {
	users: User[] | any;
	userSingle: User[] | any;
	loading: boolean;
	error: string | any;
}

const initialState: UsersListSliceState = {
	loading: false,
	users: [],
	userSingle: null,
	error: '',
};

const userActionsSlice = createSlice({
	name: 'userListing',
	initialState,
	reducers: {
		addUser: (state, { payload }) => {
			state.users = [...state.users, payload];
		},
		editUserFetch: (state, { payload }) => {
			state.userSingle = state.users.find((user: any) => user.id === payload);
		},
		editUser: (state, { payload }) => {
			const index = state.users.findIndex(
				(user: any) => user.id == state.userSingle.id
			);
			const newArray = [...state.users];
			newArray[index] = payload;
			return {
				...state,
				users: newArray,
			};
		},
		deleteUser: (state, { payload }) => {
			state.users = state.users.filter(
				({ id }: { id: number }) => id !== payload
			);
		},
		reloadUser: (state) => {
			state.users = [...state.users];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(usersFetch.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(usersFetch.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(usersFetch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

const { actions, reducer } = userActionsSlice;
export const { addUser, editUser, deleteUser, reloadUser, editUserFetch } =
	actions;
export default reducer;
