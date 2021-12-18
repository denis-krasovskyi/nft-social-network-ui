import React from 'react';
import { useSelector } from 'react-redux';
import { useToggle, useWindowScroll } from 'react-use';

import { RootState } from 'store';

import NFTListView from 'components/NFTListView';
import OptionsBlock from 'components/OptionsBlock';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Feed.module.scss';

const FeedScreen: React.FC = () => {
  const [showRelevantList, setShowRelevantList] = useToggle(true);

  const { user } = useSelector((state: RootState) => state);

  const { y: windowYScroll } = useWindowScroll();

  const showOptions = true;

  console.log(showRelevantList);
  return (
    <>
      <div className={styles.header}>
        <IconLogo />
      </div>

      {showOptions && (
        <OptionsBlock
          firstOptionName="Trending"
          secondOptionName="Following"
          firstOptionCallback={() => setShowRelevantList(true)}
          secondOptionCallback={() => setShowRelevantList(false)}
          className={windowYScroll > 5 ? styles.controlShadow : ''}
        />
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
