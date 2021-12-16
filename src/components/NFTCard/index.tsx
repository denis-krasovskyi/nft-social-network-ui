import React from 'react';
import classNames from 'classnames';

import Avatar from 'components/ui-kit/Avatar';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';

import { ReactComponent as IconExternal } from 'assets/icons/icon-external.svg';
import { ReactComponent as IconChat } from 'assets/icons/icon-chat.svg';
import { ReactComponent as IconLike } from 'assets/icons/icon-like.svg';
import { ReactComponent as IconLikeActive } from 'assets/icons/icon-like-active.svg';

import styles from './NFTCard.module.scss';

const NFTCard: React.FC<NFTCardProps> = ({
  className,
  userName,
  userAvatar,
  likesCount,
  commentsCount,
  isLiked,
  nftName,
  nftLink,
  assetLink,
  id,
  showOwnerInfo = false,
}) => {
  console.log(id);
  return (
    <div className={classNames(styles.card, className)}>
      <div className={styles.content}>
        {showOwnerInfo && (
          <div className={styles.cardHeader}>
            <Avatar alt={userName} src={userAvatar} className={styles.avatar} />

            <Typography variant="title4" className={styles.cardHeaderText}>
              {userName}
            </Typography>
          </div>
        )}

        <img src={assetLink} alt={nftName} className={styles.asset} />

        <div className={styles.footer}>
          <Button
            href={nftLink}
            variant="ghost"
            endIcon={<IconExternal height={14} />}
          >
            {nftName}
          </Button>

          <Button
            href={nftLink}
            variant="ghost"
            className={styles.footerComment}
            startIcon={<IconChat height={20} />}
          >
            {commentsCount}
          </Button>

          <Button variant="ghost">
            {isLiked ? <IconLikeActive /> : <IconLike />}

            <Typography variant="body3" className={styles.footerCommentText}>
              {likesCount}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

type NFTCardProps = {
  className?: string;
  userName?: string;
  userAvatar?: string;
  showOwnerInfo: boolean;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  nftName: string;
  nftLink: string;
  assetLink: string;
  id: number;
};

export default NFTCard;
