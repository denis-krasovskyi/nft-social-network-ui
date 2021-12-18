import { AnyAction } from 'redux';
import MockAvatar from 'assets/images/avatar-mock.png';
import { mockedUsers, mockNfts } from './mocks';

import * as actionTypes from './actionTypes';
import { UserState } from '../types';

const initialState: UserState = {
  avatar: MockAvatar,
  socials: '',
  username: 'Username',
  users: mockedUsers,
  wallets: [
    {
      walletName: 'wallet.near',
      walletUrl: 'https://google.com',
      walletType: 'near',
      id: 1,
    },
  ],
  bio: '256 or 128 symbols description of user’s status or important thoughts escription of user’s status or important',
  following: 123,
  followers: 321,
  id: '12',
  nfts: mockNfts,
  token: null,
};

const reducer = (
  state: UserState = initialState,
  action: AnyAction,
): UserState => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.GET_USER_NFTS_DATA:
      return {
        ...state,
        nfts: [...state.nfts, ...action.payload],
      };

    case actionTypes.SET_JWT_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case actionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
