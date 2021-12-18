import React from 'react';
import { Link } from '@mui/material';
import classNames from 'classnames';

import { Notification } from 'store/types';

import Typography from 'components/ui-kit/Typography';
import Avatar from 'components/ui-kit/Avatar';

import styles from './UserListItem.module.scss';

const getEventTextByType = (type: string): string => {
  switch (type) {
    case 'like':
      return 'liked your NFT Singularity.';
    case 'comment':
      return 'commented NFT Singularity.';
    case 'follow':
      return 'started following you.';
    default:
      return 'started following you.';
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  className,
  notification,
}) => {
  const eventText = getEventTextByType(notification.eventType);

  return (
    <div className={classNames(styles.userBlock, className)}>
      <Avatar
        src={notification.proceedAvatar}
        alt={notification.proceedUsername}
        className={styles.userBlockAvatar}
      />

      <Typography variant="body2" className={styles.userBlockTitle}>
        <Link href={`#/cabinet/profile/${notification.proceedId}`}>
          <Typography
            variant="heading5"
            className={styles.userBlockTitleLink}
            component="span"
          >
            {notification.proceedUsername}
          </Typography>
        </Link>
        {eventText}
      </Typography>

      {notification.sourceItemAvatar && (
        <Link href={`#/cabinet/nft/${notification.sourceItemId}`}>
          <img
            className={styles.sourceImage}
            src={notification.sourceItemAvatar}
            alt={notification.sourceItemAvatar}
          />
        </Link>
      )}
    </div>
  );
};

type NotificationItemProps = {
  className?: string;
  notification: Notification;
};

export default NotificationItem;
