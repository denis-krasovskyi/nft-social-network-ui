import React from 'react';

import { Notification } from 'store/types';

import NotificationItem from 'components/NotificationItem';
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as IconLogo } from 'assets/icons/icon-logo.svg';
import MockAsset1 from 'assets/images/mock-asset-1.png';
import MockAsset2 from 'assets/images/mock-asset-2.png';

import styles from './Notifications.module.scss';

const mockedNotifications: Notification[] = [
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'like',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset1,
    proceedUsername: 'Jaydon.near',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'comment',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset1,
    proceedUsername: 'Jaydon.near 2',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'comment',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset1,
    proceedUsername: 'Jaydon.near 2',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'follow',
    proceedAvatar: MockAsset1,
    proceedUsername: 'Jaydon.near 2',
  },
];
const mockedNotificationsOld: Notification[] = [
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'like',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset2,
    proceedUsername: 'boristheblade.near',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'comment',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset2,
    proceedUsername: 'floccinaucinihilipilification.near',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'comment',
    proceedAvatar: MockAsset1,
    sourceItemAvatar: MockAsset2,
    proceedUsername: 'fghffn.near',
  },
  {
    id: 1,
    sourceItemId: 1,
    proceedId: 1,
    eventType: 'follow',
    proceedAvatar: MockAsset2,
    proceedUsername: 'Jaydon.near 2',
  },
];

const NotificationScreen: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <IconLogo />
      </div>

      <Typography variant="body3" className={styles.label}>
        New
      </Typography>

      <div className={styles.notifications}>
        {mockedNotifications.map((notification) => (
          <NotificationItem notification={notification} />
        ))}
      </div>

      <div className={styles.separator} />

      <div className={styles.notifications}>
        {mockedNotificationsOld.map((notification) => (
          <NotificationItem notification={notification} />
        ))}
      </div>
    </>
  );
};

export default NotificationScreen;
