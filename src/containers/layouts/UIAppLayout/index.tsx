import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NearService from 'services/near';

import { RootState } from 'store';
import { initRedux } from 'store/user/actionCreators';

import { NavBar } from 'components/NavBar';

import { ReactComponent as IconFeed } from 'assets/icons/icon-feed.svg';
import { ReactComponent as IconFeedActive } from 'assets/icons/icon-feed-active.svg';
import { ReactComponent as IconSearch } from 'assets/icons/icon-search.svg';
import { ReactComponent as IconSearchActive } from 'assets/icons/icon-search-nav.svg';
import { ReactComponent as IconNotifications } from 'assets/icons/icon-notifications.svg';
import { ReactComponent as IconNotificationsActive } from 'assets/icons/icon-notifications-active.svg';
import { ReactComponent as IconProfile } from 'assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from 'assets/icons/icon-profile-active.svg';

import styles from './UIAppLayout.module.scss';

const NAVBAR_LINKS = [
  {
    name: 'feed',
    text: 'Feed',
    icon: <IconFeed />,
    iconActive: <IconFeedActive />,
    link: '/cabinet/feed',
  },
  {
    name: 'search',
    text: 'Search',
    icon: <IconSearch />,
    iconActive: <IconSearchActive style={{ color: 'transparent' }} />,
    link: '/cabinet/search',
  },
  {
    name: 'notification',
    text: 'Notification Hub',
    icon: <IconNotifications />,
    iconActive: <IconNotificationsActive />,
    link: '/cabinet/notifications',
  },
  {
    name: 'account',
    text: 'Profile',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
    link: '/cabinet/account',
  },
];

const UIAppLayout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(initRedux(history));
  }, [dispatch, history, token]);

  useEffect(() => {
    NearService.init();
  }, []);

  return (
    <div className={styles.root}>
      {children}

      <div className={styles.footer}>
        <NavBar NavBarLinks={NAVBAR_LINKS} />
      </div>
    </div>
  );
};

export default UIAppLayout;
