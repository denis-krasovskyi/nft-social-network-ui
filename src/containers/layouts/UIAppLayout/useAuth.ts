import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAsync, useUnmount } from 'react-use';

import { getUserData } from 'api/users';
import { AppDispatch } from 'store';
import { setUserData, resetUserData } from 'store/user';
import { authJWTTokenSelector } from 'store/auth';

export const useAuth = (): void => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(authJWTTokenSelector);
  const isAuthorized = Boolean(token);

  const authorize = async () => {
    if (token) {
      const { data: userData } = await getUserData();

      dispatch(setUserData(userData));
      return;
    }

    history.replace('/sign-in');
  };

  useAsync(authorize, [isAuthorized]);

  useUnmount(() => {
    dispatch(resetUserData());
  });
};
