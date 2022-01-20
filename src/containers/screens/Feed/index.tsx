import React, { useState } from 'react';
import { useToggle, useWindowScroll, useAsync } from 'react-use';

import { getPopularNftsRequest, NFT } from 'api/nfts';

import Spinner from 'components/Spinner';
import NFTListView from 'components/NFTListView';
import OptionsBlock from 'components/OptionsBlock';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Feed.module.scss';

const FeedScreen: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>();
  const [, setShowRelevantList] = useToggle(true);

  const { y: windowYScroll } = useWindowScroll();

  useAsync(async () => {
    const response = await getPopularNftsRequest();

    setNfts(response.data.data);
  }, []);

  const showOptions = true;

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

      {!nfts ? (
        <div className={styles.spinnerWrapper}>
          <Spinner className={styles.spinner} />
        </div>
      ) : (
        <NFTListView nfts={nfts} showOwnerInfo className={styles.listWrapper} />
      )}
    </>
  );
};

export default FeedScreen;
