import { AxiosResponse } from 'axios';

import api from './index';

export type UserNearAccount = {
  accountId: string;
  enabled: boolean;
};

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string | null;
  bio: string | null;
  profilePicture: string | null;
  nearAccounts: UserNearAccount[];
};

export const getUserData = (): Promise<AxiosResponse<User>> => {
  return api.get('/users/my');
};

export const updateUserData = (user: {
  username?: string;
  bio?: string;
  profilePicture?: string;
  instagram?: string;
}): Promise<AxiosResponse<boolean>> => {
  return api.patch('/users/my/profile', user);
};
