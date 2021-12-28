import { AxiosResponse } from 'axios';

import api from './index';

export type User = {
  avatar: string;
  followers: number;
  username: string;
  isFollowing: boolean;
  id: number;
};

export const getUserData = async (): Promise<AxiosResponse> => {
  return api.get('/users/my');
};
