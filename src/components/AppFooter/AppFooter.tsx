import React, { FC } from 'react';
import Typography from 'components/ui-kit/Typography';
import { SocialMedia } from './types';
import styles from './AppFooter.module.scss';

export interface AppFooterProps {
  socialMediaList: SocialMedia[];
}

export const AppFooter: FC<AppFooterProps> = ({ socialMediaList }) => {
  return (
    <footer className={styles.root}>
      <div className={styles.social}>
        {socialMediaList.map(({ icon, href }) => (
          <a
            className={styles.link}
            key={href}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {icon}
          </a>
        ))}
      </div>
      <div>
        <Typography variant="caption2" className={styles.copyright}>
          &copy; 2021 HackathonFE
        </Typography>
      </div>
    </footer>
  );
};
