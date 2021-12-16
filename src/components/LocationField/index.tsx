/* eslint-disable no-alert */
import React, {
  useState,
  useCallback,
  useRef,
  FC,
  ComponentProps,
} from 'react';
import Popover from 'components/ui-kit/Popover';

import TextField from 'components/ui-kit/TextField';
import SearchAutocomplete from 'components/SearchAutocomplete';
import Button from 'components/ui-kit/Button';

import { ReactComponent as LocationIcon } from 'assets/icons/icon-location.svg';

import styles from './LocationField.module.scss';

const CITIES = ['City 1', 'City 2', 'City 3'];

const LocationField: FC<LocationFieldProps> = ({
  onChange,
  value = '',
  name = 'location',
  label = 'Location',
  className,
  helperText,
  error,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(e.target);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSearchItemClick = (searchItemValue: string) => () => {
    setAnchorEl(null);
    onChange(searchItemValue);
  };

  const searchLocations = useCallback(() => {
    alert(`search ${searchValue}`);
  }, [searchValue]);

  const resetSearchLocation = useCallback(() => {
    setSearchValue('');
  }, []);

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        onFocus={handleFocus}
        name={name}
        label={label}
        helperText={helperText}
        error={error}
        value={value}
        className={className}
        InputProps={{
          startAdornment: <LocationIcon />,
        }}
      />
      <Popover
        ref={popoverRef}
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        disablePortal
      >
        <div className={styles.popoverContent}>
          <div className={styles.searchLocationField}>
            <SearchAutocomplete
              InputProps={{
                placeholder: 'Search a location',
                value: searchValue,
                onChange: (e) => setSearchValue(e.target.value),
              }}
              onResetClick={resetSearchLocation}
              onValueChanged={searchLocations}
            />
          </div>
          <div className={styles.locationList}>
            {CITIES.map((location) => (
              <Button
                variant="ghost"
                startIcon={<LocationIcon />}
                onClick={handleSearchItemClick(location)}
                key={location}
                style={{ justifyContent: 'flex-start' }}
                fullWidth
              >
                {location}
              </Button>
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
};

type TextFieldProps = Pick<
  ComponentProps<typeof TextField>,
  'helperText' | 'label' | 'error' | 'className'
>;

export type LocationFieldProps = TextFieldProps & {
  onChange(value: string): void;
  value?: string;
  name?: string;
};

export default LocationField;
