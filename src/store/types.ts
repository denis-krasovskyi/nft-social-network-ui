import MockAsset1 from "../assets/images/mock-asset-1.png";

export type UserState = {
  id: string;
  username: string;
  socials: string;
  nfts: NFT[];
  avatar: string;
  bio: string;
  following: number;
  followers: number;
  wallets: Wallet[];
  users: MockUser[];
  token: null | string;
};

export type MockUser = {
  avatar: string;
  followers: number;
  username: string;
  isFollowing: boolean;
  id: number;
};

export type Notification = {
  id: number;
  sourceItemId: number;
  eventType: string;
  proceedAvatar: string;
  sourceItemAvatar?: string;
  proceedUsername: string;
  proceedId: number;
};

export type Wallet = {
  walletName: string;
  walletUrl: string;
  walletType: string;
  id: number;
};

export type NFT = {
  userName?: string;
  userAvatar?: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  nftName: string;
  nftLink: string;
  assetLink: string;
  id: number;
  userId: number;
  walletId: number;
  comments: Comment[];
};

export type Comment = {
  authorName: string;
  authorAvatar: string;
  authorId: number;
  text: string;
  timestamp: number;
};
