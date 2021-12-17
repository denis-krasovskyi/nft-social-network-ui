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
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as IconSettings } from 'assets/icons/icon-settings.svg';
import { ReactComponent as IconList } from 'assets/icons/icon-list.svg';
import { ReactComponent as IconListActive } from 'assets/icons/icon-list-active.svg';
import { ReactComponent as IconGrid } from 'assets/icons/icon-grid.svg';
import { ReactComponent as IconGridActive } from 'assets/icons/icon-grid-active.svg';
import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';
import { ReactComponent as IconWarning } from 'assets/icons/icon-warning.svg';

import styles from './Account.module.scss';

const Account: FC = () => {
  const [isListView, setIsListView] = useToggle(true);
  const { y: windowYScroll } = useWindowScroll();

  const { user } = useSelector((state: RootState) => state);

  const showError = true;

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.header, {
          [styles.headerShadow]: windowYScroll > 5,
        })}
      >
        <IconLogo />

        <Button
          className={styles.headerButton}
          variant="ghost"
          href="#/cabinet/edit"
        >
          <IconSettings />
        </Button>
      </div>

      {showError && (
        <div className={styles.errorBlock}>
          <IconWarning />

          <Typography variant="body3" className={styles.errorBlockText}>
            Your wallet is disabled. All NFTs from this wallet cannot be seen by
            other users.
          </Typography>
        </div>
      )}

      <UserBio
        showSubscribe={false}
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
        <NFTListView nfts={user.nfts} showExtraControls showOwnerInfo />
      ) : (
        <NFTGridView nfts={user.nfts} />
      )}
    </div>
  );
};

export default Account;
