import React from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import Avatar from 'components/ui-kit/Avatar';
import Button from 'components/ui-kit/Button';

import { ReactComponent as IconExternal } from 'assets/icons/icon-external.svg';
import { ReactComponent as IconInstagram } from 'assets/icons/icon-instagram.svg';
import MockAsset2 from 'assets/images/mock-asset-2.png';

import styles from './UserBio.module.scss';

const UserBio: React.FC<UserBioProps> = ({
  className,
  username,
  avatar,
  onAccIdClick,
  accId,
  bio,
  instagramLink,
  isSubscribed,
  onSubscribeClick,
  showSubscribe,
}) => {
  return (
    <div className={classNames(styles.profile, className)}>
      <Avatar
        alt={username}
        src={avatar || MockAsset2}
        className={styles.avatar}
      />
      {showSubscribe && (
        <Button
          to={instagramLink}
          variant="primary"
          className={styles.instagramButton}
        >
          <IconInstagram />
        </Button>
      )}

      <div className={styles.profileColumn}>
        <Typography variant="title6" className={styles.profileName}>
          {username}
        </Typography>

        <Button
          variant="ghost"
          onClick={onAccIdClick}
          endIcon={<IconExternal height={14} />}
          className={styles.profileWallet}
        >
          <Typography variant="body3" className={styles.profileWalletLink}>
            {accId}
          </Typography>
        </Button>

        <Typography variant="body3" className={styles.profileBio}>
          {bio}
        </Typography>

        {showSubscribe && (
          <div className={styles.subscribeRow}>
            <Button
              variant="primary"
              className={styles.subscribeButton}
              onClick={onSubscribeClick}
            >
              {isSubscribed ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

type UserBioProps = {
  className?: string;
  username: string;
  avatar: string;
  onAccIdClick?: React.MouseEventHandler<HTMLButtonElement>;
  accId?: string;
  bio: string;
  instagramLink?: string;
  isSubscribed?: boolean;
  showSubscribe: boolean;
  onSubscribeClick?: () => void;
};

export default UserBio;
