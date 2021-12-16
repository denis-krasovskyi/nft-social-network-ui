import React, { FC } from 'react';
import { useToggle, useWindowScroll } from 'react-use';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import Button from 'components/ui-kit/Button';
import FollowersBlock from 'components/FollowersBlock';
import UserBio from 'components/UserBio';
import NFTListView from 'components/NFTListView';
import NFTGridView from 'components/NFTGridView';

import { ReactComponent as IconSettings } from 'assets/icons/icon-settings.svg';
import { ReactComponent as IconList } from 'assets/icons/icon-list.svg';
import { ReactComponent as IconListActive } from 'assets/icons/icon-list-active.svg';
import { ReactComponent as IconGrid } from 'assets/icons/icon-grid.svg';
import { ReactComponent as IconGridActive } from 'assets/icons/icon-grid-active.svg';
import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Account.module.scss';

const Account: FC = () => {
  const [isListView, setIsListView] = useToggle(true);
  const { y: windowYScroll } = useWindowScroll();

  const { user } = useSelector((state: RootState) => state);

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.header, {
          [styles.headerShadow]: windowYScroll > 5,
        })}
      >
        <IconLogo />

        <Button className={styles.headerButton} variant="ghost">
          <IconSettings />
        </Button>
      </div>

      <UserBio
        showSubscribe={false}
        walletUrl={user.walletUrl}
        walletName={user.walletName}
        username={user.username}
        bio={user.bio}
        avatar={user.avatar}
      />

      <div className={styles.viewControl}>
        <FollowersBlock
          className={styles.followers}
          followers={user.followers}
          following={user.following}
          followersLink="/"
          followingLink="/"
        />

        <Button
          variant="ghost"
          onClick={() => setIsListView(true)}
          className={classNames(styles.control, {
            [styles.controlActive]: isListView,
          })}
        >
          {isListView ? <IconListActive /> : <IconList />}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setIsListView(false)}
          className={classNames(styles.control, {
            [styles.controlActive]: !isListView,
          })}
        >
          {isListView ? <IconGrid /> : <IconGridActive />}
        </Button>
      </div>
      {isListView ? (
        <NFTListView nfts={user.nfts} />
      ) : (
        <NFTGridView nfts={user.nfts} />
      )}
    </div>
  );
};

export default Account;
