/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOKEN_STORAGE_KEY } from 'utils';

const initialState = {
  token: localStorage.getItem(TOKEN_STORAGE_KEY) as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWTToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setJWTToken } = authSlice.actions;

export default authSlice.reducer;
