import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserData } from 'api/users';
import { AppDispatch } from 'store';
import { setUserData } from 'store/user';
import { authJWTTokenSelector } from 'store/auth';

export const useAuth = (): { authorize(): Promise<void> } => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(authJWTTokenSelector);

  const authorize = async () => {
    if (token) {
      const { data: userData } = await getUserData();

      dispatch(setUserData(userData));
      return;
    }

    history.replace('/sign-in');
  };

  return { authorize };
};
