import React from 'react';
import { useSelector } from 'react-redux';
import { useToggle, useWindowScroll } from 'react-use';
import classNames from 'classnames';

import { RootState } from 'store';

import NFTListView from 'components/NFTListView';
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Feed.module.scss';

const FeedScreen: React.FC = () => {
  const [showRelevantList, setShowRelevantList] = useToggle(true);

  const { user } = useSelector((state: RootState) => state);

  const { y: windowYScroll } = useWindowScroll();

  const showOptions = true;

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
              onClick={() => setShowRelevantList(true)}
              className={classNames(styles.optionsLink, {
                [styles.active]: showRelevantList,
              })}
            >
              <Typography variant="title7" className={styles.optionsLinkTitle}>
                Trending
              </Typography>
            </button>

            <button
              type="button"
              onClick={() => setShowRelevantList(false)}
              className={classNames(styles.optionsLink, {
                [styles.active]: !showRelevantList,
              })}
            >
              <Typography variant="title7" className={styles.optionsLinkTitle}>
                Following
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

export default FeedScreen;
