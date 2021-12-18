import type { History } from 'history';

import { simulateHttpRequest } from 'utils';
import api from 'api';

import * as actionTypes from './actionTypes';
import { AppDispatch, RootState } from '../index';
import User from './index';

export function getUserNFTsDataAction() {
  return async (dispatch: AppDispatch): Promise<void> => {
    const response = await api.get(
      'https://develop.nft-social-network.net/nfts/my',
    );

    dispatch({
      type: actionTypes.GET_USER_NFTS_DATA,
      payload: response.data.data,
    });
  };
}

export function getUserDataAction() {
  return async (dispatch: AppDispatch): Promise<void> => {
    const response = await api.get(
      'https://develop.nft-social-network.net/users/my',
    );

    dispatch({
      type: actionTypes.GET_USER_DATA,
      payload: response.data,
    });
  };
}

export function setJWTToken(token: string) {
  return async (dispatch: AppDispatch): Promise<void> => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    getUserDataAction()(dispatch);
    getUserNFTsDataAction()(dispatch);

    dispatch({
      type: actionTypes.SET_JWT_TOKEN,
      payload: token,
    });
  };
}

type User = {
  avatar: string | null;
  username: string;
  socials: string;
  bio: string;
};

export function updateUserDataAction(user: User) {
  return async (dispatch: AppDispatch): Promise<void> => {
    await api.patch('https://develop.nft-social-network.net/users/my/profile', {
      ...user,
      avatar: null,
    });

    dispatch({
      type: actionTypes.UPDATE_USER_DATA,
      payload: user,
    });
  };
}

export function logoutAction() {
  return async (dispatch: AppDispatch): Promise<void> => {
    await simulateHttpRequest();

    dispatch({
      type: actionTypes.LOGOUT,
      payload: {},
    });
  };
}

export function initRedux(history: History) {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState,
  ): Promise<void> => {
    const { user } = getState();

    if (user.token) {
      return;
    }

    const token = localStorage.getItem('singularity-token');
    console.log(token);
    console.log(history);
    if (token) {
      setJWTToken(token)(dispatch);
    } else {
      console.log('rejected');
      history.replace('/sign-in');
    }
  };
}
