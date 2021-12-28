import { AxiosResponse } from 'axios';

import api from './index';
import { DEFAULT_PAGE_LIMIT, Pagination } from './utils';
import { Comment } from './comments';

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

export const getPopularNftsRequest = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<AxiosResponse<Pagination & { data: NFT[] }>> => {
  return api.get<Pagination & { data: NFT[] }>('/nfts/popular', {
    params: {
      ...params,
      offset: params.offset || 0,
      limit: params.limit || DEFAULT_PAGE_LIMIT,
    },
  });
};
