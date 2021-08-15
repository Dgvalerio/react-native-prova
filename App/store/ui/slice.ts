/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IUIStore } from '../../types/interfaces';

const initialState: IUIStore = {
  loading: false,
};

const uiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showLoading(state: IUIStore) {
      state.loading = true;
    },
    hideLoading(state: IUIStore) {
      state.loading = false;
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
