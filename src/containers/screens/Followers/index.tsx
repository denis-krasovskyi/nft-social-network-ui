import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';

import { RootState } from 'store';

import OptionsBlock from 'components/OptionsBlock';
import UserListItem from 'components/UserListItem';
import ScreenHeader from 'components/ScreenHeader';

import styles from './Followers.module.scss';

const FollowersPage: FC = () => {
  const history = useHistory();

  const [showFollowerList, setShowFollowerList] = useToggle(false);

  const { user } = useSelector((state: RootState) => state);

  return (
    <div className={styles.root}>
      <ScreenHeader
        onBackButtonClick={() => history.goBack()}
        title={user.username || ''}
      />

      <OptionsBlock
        firstOptionName="Following"
        firstOptionCaption={user.following?.toString()}
        firstOptionCallback={() => setShowFollowerList(false)}
        secondOptionName="Followers"
        secondOptionCaption={user.followers?.toString()}
        secondOptionCallback={() => setShowFollowerList(true)}
      />

      {showFollowerList ? (
        <div className={styles.listWrapper}>
          {user.users?.slice(0, 3).map((item) => (
            <UserListItem
              key={item.id}
              id={item.id}
              username={item.username || ''}
              // isFollowing={item.isFollowing}
              isFollowing={false}
              // avatar={item.avatar}
              avatar=""
            />
          ))}
        </div>
      ) : (
        <div className={styles.listWrapper}>
          {user.users?.slice(3, 6).map((item) => (
            <UserListItem
              key={item.id}
              id={item.id}
              username={item.username || ''}
              // isFollowing={item.isFollowing}
              isFollowing={false}
              // avatar={item.avatar}
              avatar=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersPage;
