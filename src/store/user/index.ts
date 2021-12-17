import { AnyAction } from 'redux';
import EmptyAvatar from 'assets/images/empty-avatar.svg';
import MockAvatar from 'assets/images/avatar-mock.png';
import MockAsset1 from 'assets/images/mock-asset-1.png';
import MockAsset2 from 'assets/images/mock-asset-2.png';
import MockAsset3 from 'assets/images/mock-asset-3.png';
import MockAsset4 from 'assets/images/mock-asset-4.png';
import MockAsset5 from 'assets/images/mock-asset-5.png';
import MockAsset6 from 'assets/images/mock-asset-6.png';

import * as actionTypes from './actionTypes';
import { UserState } from '../types';

export const mockNfts = [
  {
    id: 1,
    userName: 'Test1',
    userAvatar: MockAvatar,
    likesCount: 200,
    commentsCount: 100,
    isLiked: true,
    nftName: 'My NFT',
    nftLink: 'https://google.com',
    assetLink: MockAsset1,
    walletId: 1,
    comments: [
      {
        authorName: 'Test 1',
        authorAvatar: EmptyAvatar,
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        timestamp: 1639756863395,
      },
      {
        authorName: 'Test 2',
        authorAvatar: EmptyAvatar,
        text: 'Short comment',
        timestamp: 1639556663395,
      },
    ],
  },
  {
    id: 2,
    userName: 'Test2',
    userAvatar: EmptyAvatar,
    likesCount: 2233,
    commentsCount: 1001,
    isLiked: false,
    nftName: 'My NFT 2',
    nftLink: 'https://google.com',
    assetLink: MockAsset2,
    walletId: 1,
    comments: [],
  },
  {
    id: 3,
    userName: 'Test23',
    userAvatar: EmptyAvatar,
    likesCount: 20,
    commentsCount: 10,
    isLiked: false,
    nftName: 'My NFT 3',
    nftLink: 'https://google.com',
    assetLink: MockAsset3,
    walletId: 1,
    comments: [],
  },
  {
    id: 4,
    userName: 'Test23',
    userAvatar: EmptyAvatar,
    likesCount: 20,
    commentsCount: 10,
    isLiked: false,
    nftName: 'My NFT 3',
    nftLink: 'https://google.com',
    assetLink: MockAsset4,
    walletId: 1,
    comments: [],
  },
  {
    id: 5,
    userName: 'Test23',
    userAvatar: EmptyAvatar,
    likesCount: 20,
    commentsCount: 10,
    isLiked: false,
    nftName: 'My NFT 3',
    nftLink: 'https://google.com',
    assetLink: MockAsset5,
    walletId: 1,
    comments: [],
  },
  {
    id: 6,
    userName: 'Test23',
    userAvatar: EmptyAvatar,
    likesCount: 20,
    commentsCount: 10,
    isLiked: false,
    nftName: 'My NFT 3',
    nftLink: 'https://google.com',
    assetLink: MockAsset6,
    walletId: 1,
    comments: [],
  },
];

const initialState: UserState = {
  avatar: MockAvatar,
  socials: '',
  username: 'Username',
  wallets: [
    {
      walletName: 'wallet.near',
      walletUrl: 'https://google.com',
      walletType: 'near',
      id: 1,
    },
  ],

  bio: '256 or 128 symbols description of user’s status or important thoughts escription of user’s status or important',
  following: 123,
  followers: 321,
  id: '12',
  nfts: mockNfts,
};

const reducer = (
  state: UserState = initialState,
  action: AnyAction,
): UserState => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
