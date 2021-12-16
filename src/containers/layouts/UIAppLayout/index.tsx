import React from 'react';

import { NavBar } from 'components/NavBar';

import { ReactComponent as IconFeed } from 'assets/icons/icon-feed.svg';
import { ReactComponent as IconNotifications } from 'assets/icons/icon-notifications.svg';
import { ReactComponent as IconProfile } from 'assets/icons/icon-profile.svg';

import styles from './UIAppLayout.module.scss';

const NAVBAR_LINKS = [
  {
    name: 'feed',
    text: 'Feed',
    icon: <IconFeed />,
    iconActive: <IconFeed />,
    link: '/cabinet/feed',
  },
  {
    name: 'notification',
    text: 'Notifications',
    icon: <IconNotifications />,
    iconActive: <IconNotifications />,
    link: '/cabinet/notifications',
  },
  {
    name: 'account',
    text: 'Profile',
    icon: <IconProfile />,
    iconActive: <IconProfile />,
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
