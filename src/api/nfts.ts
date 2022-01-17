import { AxiosResponse } from 'axios';

import api from './index';
import { DEFAULT_PAGE_LIMIT, Pagination, PaginationParams } from './utils';
import { Comment } from './comments';

export type NFTMetadata = {
  copies: number;
  title: string;
  description: string;
  expiresAt: string | null;
  extra: unknown[];
  issuedAt: string | null;
  media: string;
  mediaHash: string;
  reference: string;
  referenceHash: null;
  startsAt: null;
};

export type PersonalNFT = {
  id: string;
  createdAt: string;
  updatedAt: string;
  contractId: string;
  tokenId: string | null;
  userId: string;
  nearAccountId: string;
  owner: string;
  minter: string;
  media: string;
  metadata: NFTMetadata;
  visible?: boolean;
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

export const getPopularNftsRequest = async (
  params?: Partial<PaginationParams>,
): Promise<AxiosResponse<Pagination & { data: NFT[] }>> => {
  return api.get<Pagination & { data: NFT[] }>('/nfts/popular', {
    params: {
      ...params,
      offset: params?.offset || 0,
      limit: params?.limit || DEFAULT_PAGE_LIMIT,
    },
  });
};

export const getMyNftsRequest = async (
  params?: Partial<PaginationParams>,
): Promise<AxiosResponse<Pagination & { data: PersonalNFT[] }>> => {
  return api.get('/nfts/my', {
    params: {
      ...params,
      offset: params?.offset || 0,
      limit: params?.limit || DEFAULT_PAGE_LIMIT,
    },
  });
};

export const setPersonalNftVisibilityRequest = async (params: {
  id: string;
  visible: boolean;
}): Promise<AxiosResponse<PersonalNFT>> => {
  return api.patch(`/nfts/my/${params.id}/${params.visible ? 'show' : 'hide'}`);
};
