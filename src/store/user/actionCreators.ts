import { simulateHttpRequest } from 'utils';
import api from 'api';

// export function getUserNFTsDataAction() {
//   return async (dispatch: AppDispatch): Promise<void> => {
//     const response = await api.get(
//       'https://develop.nft-social-network.net/nfts/my',
//     );

//     dispatch({
//       type: actionTypes.GET_USER_NFTS_DATA,
//       payload: response.data.data,
//     });
//   };
// }

// export function getUserDataAction() {
//   return async (dispatch: AppDispatch): Promise<void> => {
//     const response = await api.get(
//       'https://develop.nft-social-network.net/users/my',
//     );

//     dispatch({
//       type: actionTypes.GET_USER_DATA,
//       payload: response.data,
//     });
//   };
// }

type User = {
  avatar: string | null;
  username: string;
  socials: string;
  bio: string;
};

export function updateUserDataAction(user: User) {
  return async (): Promise<void> => {
    await api.patch('/users/my/profile', {
      ...user,
      avatar: null,
    });

    // dispatch({
    //   type: actionTypes.UPDATE_USER_DATA,
    //   payload: user,
    // });
  };
}

export function logoutAction() {
  return async (): Promise<void> => {
    await simulateHttpRequest();

    // dispatch({
    //   type: actionTypes.LOGOUT,
    //   payload: {},
    // });
  };
}
