/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Wallet } from 'api/types';
import { NFT } from 'api/nfts';
import { User } from 'api/users';

type UserState = {
  id: string;
  username: string;
  socials: string;
  nfts: NFT[];
  avatar: string;
  bio: string;
  following: number;
  followers: number;
  wallets: Wallet[];
  users: User[];
  token: null | string;
};

const initialState: Partial<UserState> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    setUserNftsData: (state, action: PayloadAction<NFT[]>) => {
      state.nfts = [...state.nfts, ...action.payload];
    },
    updateUserData: (state, action: PayloadAction<UserState>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setUserData, setUserNftsData, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
