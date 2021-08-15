/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '../../services/api';
import { IAuthStore, IUser } from '../../types/interfaces';

const initialState: IAuthStore = {
  signed: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess(
      state: IAuthStore,
      action: PayloadAction<{
        user: IUser;
        token: string;
      }>
    ) {
      state.user = action.payload.user;
      api.defaults.headers.Authorization = `Bearer ${action.payload.token}`;
      state.signed = true;
    },
    updateUser(state: IAuthStore, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    signOut(state: IAuthStore) {
      state.user = null;
      state.signed = false;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
