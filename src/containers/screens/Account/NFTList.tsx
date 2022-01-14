import React from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';

import NFTListItem, { TNFTListItem } from './NFTListItem';

import styles from './NFTList.module.scss';

const NFTList: React.FC<NFTListProps> = ({
  total,
  list,
  className,
  onMore,
  onItemClick,
  gridViewEnabled,
}) => {
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
                  onMore?.(item, e);
                }
          }
          onMorePress={
            gridViewEnabled
              ? (e) => {
                  onMore?.(item, e);
                }
              : undefined
          }
          onItemClick={(e) => {
            onItemClick?.(item, e);
          }}
          hideHead={gridViewEnabled}
        />
      ))}
    </div>
  );
};

type NFTListProps = {
  className?: string;
  total: number;
  list: TNFTListItem[];
  gridViewEnabled?: boolean;
  onMore?: (p: TNFTListItem, e?: React.MouseEvent | React.TouchEvent) => void;
  onItemClick?: (p: TNFTListItem, e: React.MouseEvent) => void;
};

export default NFTList;
