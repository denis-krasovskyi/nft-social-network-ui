import React from 'react';
import classNames from 'classnames';

import TextField from 'components/ui-kit/TextField';
import IconButton from 'components/ui-kit/IconButton';
import { useDebounceEffect } from 'hooks/useDebounceEffect';

import { ReactComponent as SearchIcon } from 'assets/icons/icon-search.svg';
import { ReactComponent as MarkIcon } from 'assets/icons/icon-mark.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/icon-close.svg';

import styles from './SearchAutocomplete.module.scss';

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  InputProps,
  onResetClick,
  onValueChanged,
  hideLocationIcon,
  debounceMs,
  className,
}) => {
  useDebounceEffect(
    ({ isInitialCall, depsHaveChanged }) => {
      if (isInitialCall || !depsHaveChanged) {
        return;
      }

      onValueChanged?.();
    },
    debounceMs || 1000,
    [InputProps.value],
  );

  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          ...InputProps,
          startAdornment: InputProps.startAdornment ?? (
            <SearchIcon className={styles.colorGreyIcon} />
          ),
          endAdornment:
            InputProps.endAdornment ??
            ((InputProps.value as string) || '')?.length > 0 ? (
              <IconButton
                onClick={onResetClick}
                className={styles.mgRightNegative}
                type="button"
              >
                <CloseIcon className={styles.closeIcon} />
              </IconButton>
            ) : (
              !hideLocationIcon && <MarkIcon className={styles.markIcon} />
            ),
          classes: {
            ...InputProps.classes,
            input: classNames(styles.input, InputProps.classes?.input),
          },
        }}
        className={classNames(styles.mgBottom, className)}
      />
    </>
  );
};

export type SearchAutocompleteProps = {
  InputProps: React.ComponentProps<typeof TextField>['InputProps'];
  onResetClick?: React.MouseEventHandler;
  onValueChanged?: () => void;
  hideLocationIcon?: boolean;
  debounceMs?: number;
  className?: string;
};

export default SearchAutocomplete;
