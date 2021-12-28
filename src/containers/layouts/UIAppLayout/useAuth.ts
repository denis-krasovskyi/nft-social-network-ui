import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import api from 'api';
import { getUserData } from 'api/users';
import { AppDispatch, RootState, useAppSelector } from 'store';
import { setUserData } from 'store/user';

export const useAuth = (): { authorize(): Promise<void> } => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector<RootState['auth']>((store) => store.auth);

  const authorize = async () => {
    if (auth?.token) {
      api.defaults.headers.common.Authorization = `Bearer ${auth?.token}`;

      const { data: userData } = await getUserData();

      dispatch(setUserData(userData));
      return;
    }

    history.replace('/sign-in');
  };

  return { authorize };
};
