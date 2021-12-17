import React from 'react';
import { useSelector } from 'react-redux';
import { useToggle, useWindowScroll } from 'react-use';
import classNames from 'classnames';

import { RootState } from 'store';

import NFTListView from 'components/NFTListView';
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Notifications.module.scss';

const NotificationsScreen: React.FC = () => {
  const [showFollowersList, setShowFollowersList] = useToggle(true);

  const { user } = useSelector((state: RootState) => state);

  const { y: windowYScroll } = useWindowScroll();

  const showOptions = false;

  return (
    <>
      <div className={styles.header}>
        <IconLogo />
      </div>

      {showOptions && (
        <div
          className={classNames(styles.control, {
            [styles.controlShadow]: windowYScroll > 5,
          })}
        >
          <div className={styles.optionsBlock}>
            <button
              type="button"
              onClick={() => setShowFollowersList(true)}
              className={classNames(styles.optionsLink, {
                [styles.active]: showFollowersList,
              })}
            >
              <Typography variant="title7" className={styles.optionsLinkTitle}>
                Followers
              </Typography>
            </button>

            <button
              type="button"
              onClick={() => setShowFollowersList(false)}
              className={classNames(styles.optionsLink, {
                [styles.active]: !showFollowersList,
              })}
            >
              <Typography variant="title7" className={styles.optionsLinkTitle}>
                Relevant
              </Typography>
            </button>
          </div>
        </div>
      )}

      <NFTListView
        nfts={user.nfts}
        showOwnerInfo
        className={styles.listWrapper}
      />
    </>
  );
};

export default NotificationsScreen;
