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
  walletId: number;
  comments: Comment[];
};

export type Comment = {
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: number;
};
