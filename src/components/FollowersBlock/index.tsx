import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Typography from 'components/ui-kit/Typography';

import styles from './FollowersBlock.module.scss';

const FollowersBlock: React.FC<FollowersBlockProps> = ({
  className,
  following,
  followingLink,
  followers,
  followersLink,
}) => {
  return (
    <div className={classNames(styles.followersBlock, className)}>
      <Link to={followingLink} className={styles.followersLink}>
        <Typography variant="body3" className={styles.followersLinkTitle}>
          Following
          <Typography variant="title7" className={styles.followersLinkCaption}>
            {following}
          </Typography>
        </Typography>
      </Link>

      <Link to={followersLink} className={styles.followersLink}>
        <Typography variant="body3" className={styles.followersLinkTitle}>
          Followers
          <Typography variant="title7" className={styles.followersLinkCaption}>
            {followers}
          </Typography>
        </Typography>
      </Link>
    </div>
  );
};

type FollowersBlockProps = {
  className?: string;
  following: number;
  followingLink: string;
  followers: number;
  followersLink: string;
};

export default FollowersBlock;
