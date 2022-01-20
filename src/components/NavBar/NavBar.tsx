import React from 'react';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import Typography from 'components/ui-kit/Typography';

import { ReactComponent as IconFeed } from 'assets/icons/icon-feed.svg';
import { ReactComponent as IconFeedActive } from 'assets/icons/icon-feed-active.svg';
import { ReactComponent as IconSearch } from 'assets/icons/icon-search.svg';
import { ReactComponent as IconSearchActive } from 'assets/icons/icon-search-nav.svg';
import { ReactComponent as IconNotifications } from 'assets/icons/icon-notifications.svg';
import { ReactComponent as IconNotificationsActive } from 'assets/icons/icon-notifications-active.svg';
import { ReactComponent as IconProfile } from 'assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from 'assets/icons/icon-profile-active.svg';

import styles from './NavBar.module.scss';

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

const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const openLink = (link: string) => {
    history.push(link);
  };

  return (
    <footer className={styles.root}>
      {NAVBAR_LINKS.map(({ name, text, icon, iconActive, link }) => {
        const isActive = location.pathname.startsWith(link);

        return (
          <div
            role="button"
            tabIndex={0}
            key={name}
            className={classNames(styles.link, {
              [styles.active]: isActive,
            })}
            onClick={() => openLink(link)}
            onKeyPress={() => openLink(link)}
          >
            {isActive ? <>{iconActive}</> : <>{icon}</>}
            <Typography variant="caption2" className={styles.text}>
              {text}
            </Typography>
          </div>
        );
      })}
    </footer>
  );
};

export default NavBar;
