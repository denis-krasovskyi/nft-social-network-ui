import React from 'react';
import { Link } from '@mui/material';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import Avatar from 'components/ui-kit/Avatar';
import Button from 'components/ui-kit/Button';

import styles from './UserListItem.module.scss';

const UserListItem: React.FC<UserListItemProps> = ({
  className,
  username,
  avatar,
  isFollowing,
  id,
}) => {
  return (
    <div className={classNames(styles.userBlock, className)}>
      <Avatar src={avatar} alt={username} className={styles.userBlockAvatar} />
      <Link href={`#/cabinet/profile/${id}`}>
        <Typography variant="heading5" className={styles.userBlockTitle}>
          {username}
        </Typography>
      </Link>

      <Button
        className={styles.userBlockButton}
        variant={isFollowing ? 'secondary' : 'primary'}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

type UserListItemProps = {
  className?: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  id: number;
};

export default UserListItem;
