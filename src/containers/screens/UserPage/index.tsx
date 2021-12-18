import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from 'store';

import FollowersBlock from 'components/FollowersBlock';
import UserBio from 'components/UserBio';
import NFTListView from 'components/NFTListView';
import ScreenHeader from 'components/ScreenHeader';

import styles from './UserPage.module.scss';

const UserPage: FC = () => {
  const history = useHistory();

  const { user } = useSelector((state: RootState) => state);

  return (
    <div className={styles.root}>
      <ScreenHeader onBackButtonClick={() => history.goBack()} />

      <UserBio
        showSubscribe
        walletUrl={user.wallets[0].walletUrl}
        walletName={user.wallets[0].walletName}
        username={user.username}
        bio={user.bio}
        avatar={user.avatar}
      />

      <div className={styles.viewControl}>
        <FollowersBlock
          className={styles.followers}
          followers={user.followers}
          following={user.following}
          followersLink={`#/cabinet/followers/${user.id}`}
          followingLink={`#/cabinet/followers/${user.id}`}
        />
      </div>

      <NFTListView nfts={user.nfts} showOwnerInfo />
    </div>
  );
};

export default UserPage;
