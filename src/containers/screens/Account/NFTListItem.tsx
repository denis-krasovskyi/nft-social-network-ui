import React from 'react';
import classNames from 'classnames';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';

import Typography from 'components/ui-kit/Typography';
import IconButton from 'components/ui-kit/IconButton';

import { ReactComponent as IconMore } from 'assets/icons/icon-more.svg';

import styles from './NFTListItem.module.scss';

const NFTListItem: React.FC<NFTListItemProps> = ({
  data,
  className,
  onMoreClick,
  onMorePress,
  onItemClick,
  hideHead,
}) => {
  const longPressEvent = useLongPress(onMorePress || null, {
    threshold: 800,
    captureEvent: true,
    cancelOnMovement: true,
    detect: LongPressDetectEvents.TOUCH,
  });

  return (
    <div className={classNames(className)}>
      {!hideHead && (
        <div className={styles.itemHead}>
          <div>
            {data.authorAvatarUrl && (
              <img src={data.authorAvatarUrl} alt={data.authorUsername} />
            )}
            <Typography
              variant="h5"
              component="p"
              className={styles.authorName}
            >
              {data.authorUsername}
            </Typography>
          </div>

          <IconButton onClick={onMoreClick}>
            <IconMore />
          </IconButton>
        </div>
      )}

      <div
        className={styles.assetWrap}
        {...longPressEvent}
        onClick={onItemClick}
        onKeyPress={undefined}
        tabIndex={0}
        role="link"
      >
        <img
          src={data.assetUrl}
          alt={data.assetTitle}
          className={styles.asset}
        />
      </div>
    </div>
  );
};

export type TNFTListItem = {
  authorUsername: string;
  authorAvatarUrl?: string;
  id: string;
  assetUrl: string;
  assetTitle?: string;
  isHidden?: boolean;
};

type NFTListItemProps = {
  className?: string;
  hideHead?: boolean;
  data: TNFTListItem;
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMorePress?: (e?: React.TouchEvent) => void;
  onItemClick?: React.MouseEventHandler;
};

export default NFTListItem;
