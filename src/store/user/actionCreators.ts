import type { History } from 'history';

import { simulateHttpRequest } from 'utils';
import api from 'api';

import * as actionTypes from './actionTypes';
import { AppDispatch, RootState } from '../index';
import User from './index';

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

    dispatch({
      type: actionTypes.SET_JWT_TOKEN,
      payload: token,
    });
  };
}

export function updateUserDataAction(user: Partial<typeof User>) {
  return async (dispatch: AppDispatch): Promise<void> => {
    await simulateHttpRequest();

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

    if (token) {
      setJWTToken(token)(dispatch);
    } else {
      history.replace('/sign-in');
    }
  };
}
