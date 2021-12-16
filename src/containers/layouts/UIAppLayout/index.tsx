import React from 'react';

import { NavBar } from 'components/NavBar';

import { ReactComponent as IconFeed } from 'assets/icons/icon-logo.svg';
import { ReactComponent as IconSaved } from 'assets/icons/icon-heart_outline.svg';
import { ReactComponent as IconSavedActive } from 'assets/icons/icon-heart_filled.svg';
import { ReactComponent as IconAccount } from 'assets/icons/icon-user_outline.svg';
import { ReactComponent as IconAccountActive } from 'assets/icons/icon-user_filled.svg';

import styles from './UIAppLayout.module.scss';

const NAVBAR_LINKS = [
  {
    name: 'feed',
    text: 'Feed',
    icon: <IconFeed />,
    iconActive: <IconFeed />,
    link: '/cabinet/managers-feed',
  },
  {
    name: 'saved',
    text: 'Saved',
    icon: <IconSaved />,
    iconActive: <IconSavedActive />,
    link: '/cabinet/manage-saved',
  },
  {
    name: 'account',
    text: 'Account',
    icon: <IconAccount />,
    iconActive: <IconAccountActive />,
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
