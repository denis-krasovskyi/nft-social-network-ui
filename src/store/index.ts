import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import rootReducer from './root-reducer';

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(rootReducer, initialState, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch | Dispatch<unknown>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
