import React, { useState } from 'react';
import classNames from 'classnames';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import Menu from 'components/ui-kit/Menu';
import MenuItem from 'components/ui-kit/MenuItem';

import { ReactComponent as SortIcon } from 'assets/icons/icon-sorting.svg';
import { ReactComponent as FilterOutlineIcon } from 'assets/icons/icon-filter_outline.svg';
import { ReactComponent as FilterAppliedOutlineIcon } from 'assets/icons/icon-filter_applied.svg';

import styles from './ManageSavedPreferences.module.scss';

const ManageSavedPreferences: React.FC<ManageSavedPreferencesProps> = ({
  className,
  sorted,
  filtered,
  sortMenuList,
  currentSortValue,
  filtersAppliedAmount,
  onApplyFilterClick,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const menuIsOpen = Boolean(menuAnchorEl);

  const openMenuClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const currentSortLabel = sortMenuList?.find(
    (item) => item.value === currentSortValue,
  )?.label;

  return (
    <div className={classNames(styles.root, className)}>
      <div
        onClick={openMenuClick}
        onKeyPress={openMenuClick}
        tabIndex={0}
        role="button"
        aria-label="Sort by"
        className={styles.half}
      >
        <div
          className={classNames(styles.iconBtn, {
            [styles.colorBlack]: sorted || menuIsOpen,
          })}
        >
          <SortIcon />
        </div>

        {(sortMenuList?.length || 0) > 0 && (
          <Menu
            anchorEl={menuAnchorEl}
            open={menuIsOpen}
            onClose={handleMenuClose}
            onBackdropClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMenuClose();
            }}
            anchorOrigin={{ horizontal: 0, vertical: 38 }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {sortMenuList?.map((item) => (
              <MenuItem key={item.value} className={styles.sortMenuItem}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    item.onClick?.(e, handleMenuClose);
                  }}
                  fullWidth
                  className={styles.sortMenuItemBtn}
                >
                  <Typography variant="body2" component="span">
                    {item.label}
                  </Typography>
                </Button>
              </MenuItem>
            ))}
          </Menu>
        )}

        <div className={styles.verticalFlex}>
          <Typography variant="label1" className={styles.fontSecondary}>
            Sort by
          </Typography>
          <Typography variant="caption">{currentSortLabel}</Typography>
        </div>
      </div>

      <div
        aria-label="Filter by"
        onClick={onApplyFilterClick}
        onKeyPress={onApplyFilterClick}
        tabIndex={0}
        role="button"
        className={styles.half}
      >
        <div className={styles.iconBtn}>
          {filtered ? <FilterAppliedOutlineIcon /> : <FilterOutlineIcon />}
        </div>

        <div className={styles.verticalFlex}>
          <Typography variant="label1" className={styles.fontSecondary}>
            Filter by
          </Typography>
          <Typography variant="caption">
            {filtersAppliedAmount
              ? `${filtersAppliedAmount} applied`
              : 'Not selected'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export enum MANAGE_SAVED_SORT_OPTIONS {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  MOST_RECENT = 'mostRecent',
}

type ManageSavedPreferencesProps = {
  className?: string;
  sorted?: boolean;
  filtered?: boolean;
  currentSortValue?: MANAGE_SAVED_SORT_OPTIONS;
  filtersAppliedAmount?: number;
  onApplyFilterClick?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  sortMenuList?: {
    value: MANAGE_SAVED_SORT_OPTIONS;
    label?: React.ReactNode;
    onClick?: (e: React.MouseEvent, closeMenuCb: () => void) => void;
  }[];
};

export default ManageSavedPreferences;
