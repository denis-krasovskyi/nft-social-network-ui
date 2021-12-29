import axios from 'axios';
import { AnyAction } from 'redux';

import store from 'store';
import { authJWTTokenSelector, setJWTTokenThunk } from 'store/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use((request) => {
  const token = authJWTTokenSelector(store.getState());

  if (token && request?.headers) {
    // eslint-disable-next-line no-param-reassign
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(setJWTTokenThunk(null) as unknown as AnyAction);
    }

    return error;
  },
);

export default instance;
