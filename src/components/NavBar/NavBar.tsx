import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import Typography from '../ui-kit/Typography';
import { NavBarLink } from './types';
import styles from './NavBar.module.scss';

export interface NavBarProps {
  NavBarLinks: NavBarLink[];
}

const getDefaultActiveLink = (location: string) => {
  switch (location) {
    case '/cabinet/notifications':
      return 'notification';
    case '/cabinet/search':
      return 'search';
    case '/cabinet/account':
      return 'account';
    case '/cabinet/edit':
      return 'account';
    case '/cabinet/feed':
      return 'feed';
    default:
      return 'feed';
  }
};

export const NavBar: FC<NavBarProps> = ({ NavBarLinks }) => {
  const history = useHistory();

  const [activeLink, setActiveLink] = useState(
    getDefaultActiveLink(history.location.pathname),
  );

  const openLink = (link: string, name: string) => {
    setActiveLink(name);

    history.push(link);
  };

  return (
    <footer className={styles.root}>
      {NavBarLinks.map(({ name, text, icon, iconActive, link }) => (
        <div
          role="button"
          tabIndex={0}
          key={name}
          className={classNames(styles.link, {
            [styles.active]: name === activeLink,
          })}
          onClick={() => openLink(link, name)}
          onKeyPress={() => openLink(link, name)}
        >
          {name === activeLink ? <>{iconActive}</> : <>{icon}</>}
          <Typography variant="caption2" className={styles.text}>
            {text}
          </Typography>
        </div>
      ))}
    </footer>
  );
};
