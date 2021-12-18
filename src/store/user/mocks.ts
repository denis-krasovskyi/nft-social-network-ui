import MockAsset1 from 'assets/images/mock-asset-1.png';
import MockAsset2 from 'assets/images/mock-asset-2.png';
import MockAsset3 from 'assets/images/mock-asset-3.png';
import MockAsset4 from 'assets/images/mock-asset-4.png';
import MockAsset5 from 'assets/images/mock-asset-5.png';
import MockAsset6 from 'assets/images/mock-asset-6.png';
import MockAvatar from 'assets/images/avatar-mock.png';
import EmptyAvatar from 'assets/images/empty-avatar.svg';
import { MockUser } from '../types';

export const mockedUsers: MockUser[] = [
  {
    id: 1,
    avatar: MockAsset1,
    followers: 201,
    username: 'Jaydon.near',
    isFollowing: true,
  },
  {
    id: 2,
    avatar: MockAsset2,
    followers: 103,
    username: 'emery.near',
    isFollowing: false,
  },
  {
    id: 3,
    avatar: MockAsset3,
    followers: 2,
    username: 'k.near',
    isFollowing: true,
  },
  {
    id: 4,
    avatar: MockAsset4,
    followers: 2004,
    username: 'kevin.near',
    isFollowing: false,
  },
  {
    id: 5,
    avatar: MockAsset5,
    followers: 14,
    username: 'boristheblade.near',
    isFollowing: true,
  },
  {
    id: 6,
    avatar: MockAsset6,
    followers: 155,
    username: 'floccinoxinihilipificati',
    isFollowing: false,
  },
];

export const mockNfts = [
  {
    id: 1,
    userId: 1,
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
        authorId: 1,
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        timestamp: 1639756863395,
      },
      {
        authorName: 'Test 2',
        authorId: 2,
        authorAvatar: EmptyAvatar,
        text: 'Short comment',
        timestamp: 1639556663395,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
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
    userId: 3,
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
    userId: 4,
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
    userId: 5,
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
    userId: 6,
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
