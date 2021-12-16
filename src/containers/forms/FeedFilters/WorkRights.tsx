import React from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import Chip from 'components/ui-kit/Chip';

import { ReactComponent as AddIcon } from 'assets/icons/icon-add.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/icon-done.svg';

import styles from './FeedFilters.module.scss';

export enum WORK_RIGHTS {
  all,
  visaLimited,
  australian,
  visa,
  pr,
  notKnown,
}

const WorkRights: React.FC<WorkRightsProps> = ({
  list,
  currentValue,
  onItemClick,
}) => {
  return (
    <div className={classNames(styles.paddingSide, styles.mgBottomXs)}>
      <Typography
        variant="subtitle4"
        className={classNames(styles.mgBottomSm, styles.fontBold)}
      >
        Work Rights
      </Typography>

      {list.map((item) => {
        const selected = currentValue.includes(item.value);
        const isAll = item.value === WORK_RIGHTS.all;

        const icon = selected ? <DoneIcon /> : <AddIcon />;

        return (
          <Chip
            key={item.value}
            variant="outlined"
            clickable
            selected={selected}
            label={item.label}
            className={classNames(
              styles.chip,
              styles.mgBottomSm,
              styles.chipDisabled,
            )}
            classes={{
              icon: styles.workRightsChipIcon,
            }}
            icon={!isAll ? icon : undefined}
            disabled={isAll && selected}
            onClick={(e) => {
              onItemClick?.(e, { ...item, selected });
            }}
          />
        );
      })}
    </div>
  );
};

type WorkRightsListOption = {
  label: React.ReactNode;
  value: WORK_RIGHTS;
};

type WorkRightsProps = {
  list: WorkRightsListOption[];
  currentValue: WORK_RIGHTS[];
  onItemClick?: (
    e: React.MouseEvent,
    option: WorkRightsListOption & { selected: boolean },
  ) => void | Promise<void>;
};

export default WorkRights;
