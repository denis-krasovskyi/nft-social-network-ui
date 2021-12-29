import { AxiosResponse } from 'axios';

import api from './index';

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string | null;
  bio: string | null;
  profilePicture: string | null;
  nearAccounts: {
    accountId: string;
    enabled: boolean;
  }[];
};

export const getUserData = async (): Promise<AxiosResponse<User>> => {
  return api.get('/users/my');
};
