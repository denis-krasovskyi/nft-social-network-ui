import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import NFTListView from 'components/NFTListView';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Feed.module.scss';

const FeedScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state);

  return (
    <>
      <div className={styles.header}>
        <IconLogo />
      </div>

      <NFTListView
        nfts={user.nfts}
        showOwnerInfo
        className={styles.listWrapper}
      />
    </>
  );
};

export default FeedScreen;
