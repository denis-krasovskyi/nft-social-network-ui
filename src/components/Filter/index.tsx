import React, { FC } from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';

import styles from './Filter.module.scss';

const Filter: FC<FilterProps> = ({
  className,
  caption,
  label,
  onClick,
  icon,
}) => {
  return (
    <div
      className={classNames(styles.root, className)}
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.flexColumn}>
        <Typography variant="label1" className={styles.fontSecondary}>
          {label}
        </Typography>
        <Typography variant="caption">{caption}</Typography>
      </div>
    </div>
  );
};

export type FilterProps = {
  className?: string;
  onClick(): void;
  icon: React.ReactNode;
  label: string;
  caption: string;
};

export default Filter;
