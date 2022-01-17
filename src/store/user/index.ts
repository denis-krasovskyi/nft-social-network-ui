/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { Wallet } from 'api/types';
import type { PersonalNFT } from 'api/nfts';
import type { User } from 'api/users';

import type { RootState } from 'store';

type UserState = User & {
  socials: string;
  nfts?: {
    total: number;
    list: PersonalNFT[];
  };
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
    setUserNfts: (state, action: PayloadAction<UserState['nfts']>) => {
      state.nfts = action.payload;

      return state;
    },
    appendUserNfts: (
      state,
      action: PayloadAction<{ total?: number; list: PersonalNFT[] }>,
    ) => {
      state.nfts = {
        total: action.payload.total || state.nfts?.total || 0,
        list: [...(state.nfts?.list || []), ...action.payload.list],
      };

      return state;
    },
    setUserNftVisibility: (
      state,
      action: PayloadAction<{ id: string; visible: boolean }>,
    ) => {
      if (state.nfts?.list) {
        state.nfts.list = state.nfts.list.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              visible: action.payload.visible,
            };
          }

          return item;
        });
      }

      return state;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      state = { ...state, ...action.payload };

      return state;
    },
    resetUserData: () => ({}),
  },
});

export const userSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user,
);

export const defaultUserNearAccSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.nearAccounts?.[0],
);

export const {
  setUserData,
  setUserNfts,
  updateUserData,
  appendUserNfts,
  resetUserData,
  setUserNftVisibility,
} = userSlice.actions;

export default userSlice.reducer;
