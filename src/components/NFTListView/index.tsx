import React from 'react';
import classNames from 'classnames';

import { NFT } from 'store/types';

import NFTCard from 'components/NFTCard';

import styles from './NFTListView.module.scss';

const NFTListView: React.FC<NFTListViewProps> = ({ nfts, className }) => {
  return (
    <div className={classNames(styles.listRoot, className)}>
      {nfts.map((item) => (
        <NFTCard
          key={item.id.toString()}
          id={item.id}
          showOwnerInfo={false}
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
  );
};

type NFTListViewProps = {
  className?: string;
  nfts: NFT[];
};

export default NFTListView;
