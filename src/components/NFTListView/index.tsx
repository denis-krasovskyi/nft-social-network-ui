import React from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import NFTCard from 'components/NFTCard';
import { NFT } from 'api/nfts';

import styles from './NFTListView.module.scss';

const NFTListView: React.FC<NFTListViewProps> = ({
  nfts,
  className,
  showOwnerInfo = false,
  showExtraControls = false,
}) => {
  if (nfts.length === 0) {
    return (
      <div
        className={classNames(styles.listRoot, styles.emptyListRoot, className)}
      >
        <Typography variant="subtitle1" component="p">
          Empty list
        </Typography>
      </div>
    );
  }
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
