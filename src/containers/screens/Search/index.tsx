import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import Typography from 'components/ui-kit/Typography';
import NFTCard from 'components/NFTCard';

import styles from './SearchPage.module.scss';

const ManageSavedScreen: React.FC = () => {
  const { nfts } = useSelector((state: RootState) => state.user);

  return (
    <>
      {nfts.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.listRoot}>
            {nfts.map((item) => (
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
