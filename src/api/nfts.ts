import api from './index';

export const getPopularNftsRequest = () =>
  api.get('https://develop.nft-social-network.net/nfts/popular');
