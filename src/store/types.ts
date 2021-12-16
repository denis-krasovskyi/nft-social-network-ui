export type UserState = {
  id: string;
  username: string;
  nfts: NFT[];
  avatar: string;
  walletName: string;
  walletUrl: string;
  bio: string;
  following: number;
  followers: number;
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
};
