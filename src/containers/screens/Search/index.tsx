import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToggle, useWindowScroll } from 'react-use';

import { simulateHttpRequest } from 'utils';

import { RootState } from 'store';

import NFTGridView from 'components/NFTGridView';
import OptionsBlock from 'components/OptionsBlock';
import Search from 'components/Search';
import Typography from 'components/ui-kit/Typography';
import UserListItem from 'components/UserListItem';

import styles from './SearchPage.module.scss';

const SearchScreen: React.FC = () => {
  const { nfts, users } = useSelector((state: RootState) => state.user);
  const { y: windowYScroll } = useWindowScroll();

  // const [ntfsList, setNftsList] = useState<NFT[]>(nfts);

  const [showTopNFTList, setShowTopNFTList] = useToggle(true);
  const [searchValue, setSearchValue] = useState('');
  const [lastSearchValue, setLastSearchValue] = useState('');
  const [isLoading, setIsLoading] = useToggle(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchValue) {
        setIsLoading(true);

        setLastSearchValue(searchValue);

        await simulateHttpRequest();

        setIsLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, setIsLoading]);

  return (
    <div className={styles.root}>
      <Search
        onChange={(val) => setSearchValue(val)}
        className={styles.searchWrapper}
      />

      <OptionsBlock
        className={windowYScroll > 1 ? styles.controlShadow : ''}
        firstOptionName="NFT's"
        secondOptionName="People"
        firstOptionCallback={() => setShowTopNFTList(true)}
        secondOptionCallback={() => setShowTopNFTList(false)}
      />

      {isLoading ? (
        <Typography variant="body3" className={styles.textWrapper}>
          Searching for “
          <Typography variant="heading6" component="span">
            {lastSearchValue}
          </Typography>
          ”...
        </Typography>
      ) : (
        <>
          {showTopNFTList ? (
            <div className={styles.listWrapper}>
              <NFTGridView nfts={nfts} />
            </div>
          ) : (
            <div className={styles.listWrapper}>
              {users.map((user) => (
                <UserListItem
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  isFollowing={user.isFollowing}
                  avatar={user.avatar}
                />
              ))}
            </div>
          )}
        </>
      )}
      {/* <Typography variant="body3" className={styles.textWrapper}>
            Nothing found for “
            <Typography variant="heading6" component="span">
              {lastSearchValue}
            </Typography>
            ”...
          </Typography> */}
    </div>
  );
};

export default SearchScreen;
