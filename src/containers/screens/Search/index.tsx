import React from 'react';

import Typography from 'components/ui-kit/Typography';
import NFTCard from 'components/NFTCard';

import EmptyAvatar from 'assets/images/empty-avatar.svg';
import MockAsset from 'assets/images/account-bg.svg';

import styles from './SearchPage.module.scss';

type SavedItem = {
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

const mockItems: SavedItem[] = [
  {
    id: 1,
    userName: 'Test1',
    userAvatar: EmptyAvatar,
    likesCount: 200,
    commentsCount: 100,
    isLiked: true,
    nftName: 'My NFT',
    nftLink: 'https://google.com',
    assetLink: MockAsset,
  },
  {
    id: 2,
    userName: 'Test2',
    userAvatar: EmptyAvatar,
    likesCount: 200,
    commentsCount: 100,
    isLiked: false,
    nftName: 'My NFT 2',
    nftLink: 'https://google.com',
    assetLink: MockAsset,
  },
];

const ManageSavedScreen: React.FC = () => {
  return (
    <>
      {mockItems.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.listRoot}>
            {mockItems.map((item) => (
              <NFTCard
                showOwnerInfo
                key={item.id.toString()}
                id={item.id}
                userName={item.userName}
                userAvatar={item.userAvatar}
                likesCount={item.likesCount}
                commentsCount={item.commentsCount}
                isLiked={item.isLiked}
                nftName={item.nftName}
                nftLink={item.nftLink}
                assetLink={item.assetLink}
                className={styles.candidateCardRoot}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyList}>
          <Typography variant="h2">No saved candidates</Typography>
        </div>
      )}
    </>
  );
};

export default ManageSavedScreen;
