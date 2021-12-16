import React, { FC } from 'react';
import { useToggle } from 'react-use';

import Button from 'components/ui-kit/Button';
import FollowersBlock from 'components/FollowersBlock';
import UserBio from 'components/UserBio';

import { ReactComponent as IconSettings } from 'assets/icons/icon-settings.svg';
import { ReactComponent as IconList } from 'assets/icons/icon-list.svg';
import { ReactComponent as IconListActive } from 'assets/icons/icon-list-active.svg';
import { ReactComponent as IconGrid } from 'assets/icons/icon-grid.svg';
import { ReactComponent as IconGridActive } from 'assets/icons/icon-grid-active.svg';
import AvatarMock from 'assets/images/avatar-mock.png';

import classNames from 'classnames';
import styles from './Account.module.scss';

const Account: FC = () => {
  const [isListView, setIsListView] = useToggle(true);

  const user = {
    avatar: AvatarMock,
    username: 'Username',
    walletName: 'wallet.near',
    walletUrl: 'https://google.com',
    bio: '256 or 128 symbols description of user’s status or important thoughts escription of user’s status or important',
    following: 123,
    followers: 321,
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
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

      <FollowersBlock
        followers={user.followers}
        following={user.following}
        followersLink="/"
        followingLink="/"
      />

      <div className={styles.viewControl}>
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

      {}
    </div>
  );
};

export default Account;
