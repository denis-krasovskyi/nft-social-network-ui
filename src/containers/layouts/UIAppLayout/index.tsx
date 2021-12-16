import React from 'react';

import { NavBar } from 'components/NavBar';

import { ReactComponent as IconFeed } from 'assets/icons/icon-feed.svg';
import { ReactComponent as IconFeedActive } from 'assets/icons/icon-feed-active.svg';
import { ReactComponent as IconSearch } from 'assets/icons/icon-search.svg';
import { ReactComponent as IconSearchActive } from 'assets/icons/icon-search-active.svg';
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
    iconActive: <IconSearchActive />,
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
