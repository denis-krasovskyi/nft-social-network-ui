import React, { useEffect, useState } from 'react';
import { useToggle, useWindowScroll } from 'react-use';

import { getPopularNftsRequest } from 'api/nfts';

import { NFT } from 'store/types';
import { mockNfts } from 'store/user/mocks';

import Spinner from 'components/Spinner';
import NFTListView from 'components/NFTListView';
import OptionsBlock from 'components/OptionsBlock';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';

import styles from './Feed.module.scss';

const FeedScreen: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useToggle(true);
  const [showRelevantList, setShowRelevantList] = useToggle(true);

  const { y: windowYScroll } = useWindowScroll();

  useEffect(() => {
    const getData = async () => {
      const response = await getPopularNftsRequest();

      setNfts([...response.data.data, ...mockNfts]);

      setIsLoading(false);
    };

    getData();
  }, [setIsLoading]);

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
      {isLoading ? (
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
