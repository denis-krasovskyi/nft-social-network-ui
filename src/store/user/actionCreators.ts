import { simulateHttpRequest } from 'utils';
import { AppDispatch } from '../index';
import * as actionTypes from './actionTypes';

export function getUserDataAction() {
  return async (dispatch: AppDispatch): Promise<void> => {
    await simulateHttpRequest();

    dispatch({
      type: actionTypes.GET_USER_DATA,
      payload: {},
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
