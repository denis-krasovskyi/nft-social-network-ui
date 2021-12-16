import { AnyAction } from 'redux';
import * as actionTypes from './actionTypes';
import { UserState } from '../types';

const initialState: UserState = {
  id: '',
  username: '',
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
    default:
      return state;
  }
};

export default reducer;
