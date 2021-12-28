import React from 'react';
import classNames from 'classnames';

import { NFT } from 'api/nfts';

import NFTCard from 'components/NFTCard';

import styles from './NFTListView.module.scss';

const NFTListView: React.FC<NFTListViewProps> = ({
  nfts,
  className,
  showOwnerInfo = false,
  showExtraControls = false,
}) => {
  return (
    <div className={classNames(styles.listRoot, className)}>
      {nfts.map((item) => (
        <NFTCard
          key={item.id.toString()}
          id={item.id}
          showOwnerInfo={showOwnerInfo}
          userName={item.userName}
          userAvatar={item.userAvatar}
          likesCount={item.likesCount}
          commentsCount={item.comments.length}
          isLiked={item.isLiked}
          nftName={item.nftName}
          nftLink={item.nftLink}
          assetLink={item.assetLink}
          userId={item.userId}
          className={styles.candidateCardRoot}
          showExtraControls={showExtraControls}
        />
      ))}
    </div>
  );
};

type NFTListViewProps = {
  className?: string;
  showOwnerInfo?: boolean;
  showExtraControls?: boolean;
  nfts: NFT[];
};

export default NFTListView;
