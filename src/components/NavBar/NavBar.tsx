import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import Typography from '../ui-kit/Typography';
import { NavBarLink } from './types';
import styles from './NavBar.module.scss';

export interface NavBarProps {
  NavBarLinks: NavBarLink[];
}

export const NavBar: FC<NavBarProps> = ({ NavBarLinks }) => {
  const history = useHistory();
  const [activeLink, setActiveLink] = useState('feed');

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
          <Typography variant="caption3" className={styles.text}>
            {text}
          </Typography>
        </div>
      ))}
    </footer>
  );
};
