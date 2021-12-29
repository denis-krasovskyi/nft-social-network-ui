/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { TOKEN_STORAGE_KEY } from 'utils';

import type { RootState, AppThunk } from 'store';

const initialState = {
  token: localStorage.getItem(TOKEN_STORAGE_KEY) as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWTToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const authSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth,
);
export const authJWTTokenSelector = createSelector(
  authSelector,
  (auth) => auth.token,
);

export const { setJWTToken } = authSlice.actions;

export const setJWTTokenThunk: (p: string | null) => AppThunk =
  (payload) => (dispatch) => {
    dispatch(setJWTToken(payload));

    if (payload) {
      localStorage.setItem(TOKEN_STORAGE_KEY, payload);
      return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

export default authSlice.reducer;
