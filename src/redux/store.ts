import { configureStore } from '@reduxjs/toolkit';
import userListingReducer from './features/userActionsSlice';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'primary',
	storage,
};

const persistReducers = persistReducer(persistConfig, userListingReducer);

const store = configureStore({
	reducer: { usersList: persistReducers },
	middleware: (getDefaultMiddle) =>
		getDefaultMiddle({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export const selectUsers = (state: RootState) => state.usersList;
export type AppDispatch = typeof store.dispatch;
export { store };
