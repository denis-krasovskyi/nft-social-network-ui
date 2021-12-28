import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

// axios.interceptors.request.use((config) => {
//   const { auth } = store.getState();

//   if (auth.token) {
//     // eslint-disable-next-line no-param-reassign
//     config.headers.Authorization = `Bearer ${auth.token}`;
//   }

//   return config;
// });

export default instance;
