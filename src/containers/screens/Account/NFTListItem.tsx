import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useToggle } from 'react-use';

import Typography from 'components/ui-kit/Typography';
import IconButton from 'components/ui-kit/IconButton';

import { ReactComponent as IconMore } from 'assets/icons/icon-more.svg';
import { ReactComponent as IconHidden } from 'assets/icons/icon-eye-off.svg';

import styles from './NFTListItem.module.scss';

function useLongPress(callback?: () => void, ms = 800) {
  const [startLongPress, setStartLongPress] = useToggle(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const stopLongPressOnScroll = () => {
      setStartLongPress(false);
      window.removeEventListener('scroll', stopLongPressOnScroll);
    };

    if (startLongPress && callback) {
      timerId = setTimeout(callback, ms);

      window.addEventListener('scroll', stopLongPressOnScroll);
    } else if (timerId) {
      clearTimeout(timerId);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        window.removeEventListener('scroll', stopLongPressOnScroll);
      }
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}

const NFTListItem: React.FC<NFTListItemProps> = ({
  data,
  className,
  onMoreClick,
  onMorePress,
  onItemClick,
  largeSize,
}) => {
  const longPressBind = useLongPress(onMorePress);

  return (
    <div className={classNames(className, { [styles.rootSmall]: !largeSize })}>
      {largeSize && (
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
        className={classNames(styles.assetWrap, {
          [styles.assetWrapSmall]: !largeSize,
        })}
        {...longPressBind}
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
        {data.visible === false && (
          <div className={styles.assetHiddenOverlay}>
            <IconHidden
              className={classNames(styles.eyeOffIcon, {
                [styles.eyeOffLargeIcon]: largeSize,
              })}
            />
          </div>
        )}
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
  visible?: boolean;
};

type NFTListItemProps = {
  className?: string;
  largeSize?: boolean;
  data: TNFTListItem;
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMorePress?: () => void;
  onItemClick?: React.MouseEventHandler;
};

export default NFTListItem;
