/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { Wallet } from 'api/types';
import type { NFT } from 'api/nfts';
import type { User } from 'api/users';

import type { RootState } from 'store';

type UserState = User & {
  socials: string;
  nfts: NFT[];
  avatar: string;
  following: number;
  followers: number;
  wallets: Wallet[];
  users: User[];
};

const initialState: Partial<UserState> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return action.payload;
    },
    setUserNftsData: (state, action: PayloadAction<NFT[]>) => {
      state.nfts = [...(state.nfts || []), ...action.payload];
    },
    updateUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const userSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user,
);

export const { setUserData, setUserNftsData, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
