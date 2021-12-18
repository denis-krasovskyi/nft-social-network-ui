import React from 'react';
import classNames from 'classnames';
import { Link } from '@mui/material';

import { NFT } from 'store/types';

import styles from './NFTGridView.module.scss';

const NFTGridView: React.FC<NFTGridViewProps> = ({ nfts, className }) => {
  return (
    <div className={classNames(styles.listRoot, className)}>
      {nfts.map((item) => (
        <Link href={`/nft/${item.id}`} className={styles.link} key={item.id}>
          <img
            key={item.id.toString()}
            alt={item.nftName}
            src={item.assetLink}
            className={styles.image}
          />
        </Link>
      ))}
    </div>
  );
};

type NFTGridViewProps = {
  className?: string;
  nfts: NFT[];
};

export default NFTGridView;
