import React from 'react';
import classNames from 'classnames';

import IconButton from 'components/ui-kit/IconButton';
import Typography from 'components/ui-kit/Typography';

import { ReactComponent as CloseIcon } from 'assets/icons/icon-close.svg';

import styles from './FeedFilters.module.scss';

const TypicalList: React.FC<TypicalListProps> = ({
  list,
  title,
  onClick,
  onCloseClick,
  className,
}) => (
  <div
    role="button"
    onClick={onClick}
    onKeyPress={onClick}
    tabIndex={0}
    className={classNames(
      className,
      styles.paddingSide,
      styles.mgBottom,
      styles.typicalListRoot,
    )}
  >
    <div className={styles.typicalListMain}>
      <Typography variant="title4" component="p" className={styles.capitalize}>
        {title}
      </Typography>

      {list?.length === 0 && (
        <Typography
          variant="title4"
          component="p"
          className={classNames(styles.fontWeight, styles.colorGray)}
        >
          Any {title}
        </Typography>
      )}

      {list?.length > 0 && (
        <div className={styles.typicalListList}>
          {list.map((item, i) => (
            <Typography
              key={item.id}
              variant="title4"
              component="span"
              className={styles.fontWeight}
            >
              {item.label}
              {i !== list.length - 1 ? '; ' : ''}
            </Typography>
          ))}
        </div>
      )}
    </div>

    {onCloseClick && (list || []).length > 0 && (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onCloseClick(e);
        }}
        type="button"
        aria-label="reset"
        className={styles.typicalListResetBtn}
      >
        <CloseIcon />
      </IconButton>
    )}
  </div>
);

export type TypicalListProps = {
  title: string;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  list?: { label?: React.ReactNode; id: string | number }[];
  className?: string;
};

export default TypicalList;
