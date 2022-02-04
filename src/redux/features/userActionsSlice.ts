import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
		addUser: (state, action: PayloadAction<string>) => {
			state.users = [...state.users, action.payload];
		},
		editUser: (state, action: PayloadAction<number>) => {
			state.userSingle = state.users.filter(
				({ user }: { user: any }) => user.id === action.payload
			);
		},
		deleteUser: (state, action: PayloadAction<number>) => {},
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
export const { addUser, editUser, deleteUser } = actions;
export default reducer;
