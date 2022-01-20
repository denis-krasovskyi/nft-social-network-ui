/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { KeyPair } from 'near-api-js';

import { TOKEN_STORAGE_KEY, ACCOUNT_ID_STORAGE_KEY } from 'utils';
import { keyStore } from 'services/near';

import type { RootState, AppThunk } from 'store';

const initialState = {
  token: localStorage.getItem(TOKEN_STORAGE_KEY) as string | null,
  accountId: localStorage.getItem(ACCOUNT_ID_STORAGE_KEY) as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWTToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;

      return state;
    },
    setAccountId: (state, action: PayloadAction<string | null>) => {
      state.accountId = action.payload;

      return state;
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
export const accountIdSelector = createSelector(
  authSelector,
  (auth) => auth.accountId,
);

export const { setJWTToken, setAccountId } = authSlice.actions;

export const setJWTTokenThunk: (p: string | null) => AppThunk =
  (payload) => (dispatch) => {
    dispatch(setJWTToken(payload));

    if (payload) {
      localStorage.setItem(TOKEN_STORAGE_KEY, payload);
      return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

export const setAccountTokenThunk: (
  p: string,
  accessKey: KeyPair | null,
) => AppThunk = (accId, accessKey) => (dispatch) => {
  if (accessKey) {
    dispatch(setAccountId(accId));
    localStorage.setItem(ACCOUNT_ID_STORAGE_KEY, accId);
    keyStore?.setKey(process.env.REACT_APP_NETWORK_ID, accId, accessKey);
    return;
  }

  dispatch(setAccountId(null));
  localStorage.removeItem(ACCOUNT_ID_STORAGE_KEY);
  keyStore?.removeKey(process.env.REACT_APP_NETWORK_ID, accId);
};

export default authSlice.reducer;
