import React, { useState } from 'react';
import classNames from 'classnames';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import Divider from 'components/ui-kit/Divider';
import { BottomSheet } from 'components/ui-kit/ModalSheet';

import NFTListItem, { TNFTListItem } from './NFTListItem';

import styles from './NFTList.module.scss';

const NFTList: React.FC<NFTListProps> = ({
  total,
  list,
  className,
  onMore,
  onItemClick,
  gridViewEnabled,
  toggleNftVisilibtyBtnDisabled,
  onCopyNftClick,
  onShareNftClick,
  onChangeNftVisibilityClick,
}) => {
  const [currentNft, setCurrentNft] = useState<TNFTListItem>();

  const showMoreMenu = Boolean(currentNft);

  if (total === 0) {
    return (
      <div className={classNames(styles.emptyListRoot, className)}>
        <Typography variant="subtitle1" component="p">
          Empty list
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={classNames(className, styles.listRoot, {
        [styles.gridRoot]: gridViewEnabled,
      })}
    >
      {list.map((item) => (
        <NFTListItem
          key={item.id.toString()}
          data={item}
          onMoreClick={
            gridViewEnabled
              ? undefined
              : (e) => {
                  setCurrentNft(item);
                  onMore?.(item, e);
                }
          }
          onMorePress={
            gridViewEnabled
              ? () => {
                  setCurrentNft(item);
                  onMore?.(item);
                }
              : undefined
          }
          onItemClick={(e) => {
            if (showMoreMenu) return;
            onItemClick?.(item, e);
          }}
          largeSize={!gridViewEnabled}
        />
      ))}

      <BottomSheet
        open={showMoreMenu}
        onDismiss={() => {
          setCurrentNft(undefined);
        }}
        initialFocusRef={false}
        className={styles.moreContent}
      >
        <Button
          variant="ghost"
          onClick={(e) => {
            if (currentNft) {
              onCopyNftClick?.(currentNft, e);
            }
          }}
          fullWidth
          className={styles.moreButton}
        >
          <Typography variant="body2" component="span">
            Copy Link
          </Typography>
        </Button>

        <Button
          variant="ghost"
          onClick={(e) => {
            if (currentNft) {
              onShareNftClick?.(currentNft, e);
            }
          }}
          fullWidth
          className={styles.moreButton}
        >
          <Typography variant="body2" component="span">
            Share via...
          </Typography>
        </Button>

        <Divider className={styles.moreDivider} />

        <div className={styles.moreBottom}>
          <div className={styles.moreBottomContent}>
            <Typography variant="heading6">Hide NFT</Typography>
            <Typography variant="label1">
              If you don’t want this NFT to appear in your account switch to
              HIDE
            </Typography>
          </div>

          <Button
            variant="ghost"
            size="small"
            fullWidth
            onClick={(e) => {
              if (currentNft) {
                onChangeNftVisibilityClick?.(currentNft, e);
                setCurrentNft(undefined);
              }
            }}
            disabled={toggleNftVisilibtyBtnDisabled}
            className={classNames(styles.moreHideBtn, {
              [styles.moreHideBtnReverse]: currentNft?.visible === false,
            })}
          >
            <span />{' '}
            <Typography variant="tagline2">
              {currentNft?.visible === false ? 'SHOW' : 'HIDE'}
            </Typography>
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

type NFTListProps = {
  className?: string;
  total: number;
  list: TNFTListItem[];
  gridViewEnabled?: boolean;
  toggleNftVisilibtyBtnDisabled?: boolean;
  onMore?: (p: TNFTListItem, e?: React.MouseEvent) => void;
  onItemClick?: (p: TNFTListItem, e: React.MouseEvent) => void;
  onCopyNftClick?: (p: TNFTListItem, e: React.MouseEvent) => void;
  onShareNftClick?: (p: TNFTListItem, e: React.MouseEvent) => void;
  onChangeNftVisibilityClick?: (p: TNFTListItem, e: React.MouseEvent) => void;
};

export default React.memo(NFTList);
