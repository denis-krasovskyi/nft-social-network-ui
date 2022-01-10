import React, { useState } from 'react';

import { ReactComponent as IconArrowUpward } from 'assets/icons/icon-arrow_upward.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/icon-search.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-done.svg';
import { ReactComponent as AddIcon } from 'assets/icons/icon-add.svg';

import { BottomSheet } from 'components/ui-kit/ModalSheet';
import Typography from 'components/ui-kit/Typography';
import Chip from 'components/ui-kit/Chip';
import Button from 'components/ui-kit/Button';
import TextField from 'components/ui-kit/TextField';
import { Location } from './types';

import styles from './LocationModal.module.scss';

type LocationModalProps = {
  locations: Location[];
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const LocationModal: React.FC<LocationModalProps> = ({
  locations,
  onClose,
  onSubmit,
  isOpen,
}) => {
  const [modalTitle, setModalTitle] = useState('Location');
  const [locationsState, setLocationsState] = useState(locations);

  const handleLocationClick = (locationId: number) => {
    const locState = [...locationsState];
    locState.map((location) => {
      if (location.id === locationId) {
        const index = locState.indexOf(location);
        const loc = { ...location };
        loc.selected = !loc.selected;
        locState[index] = loc;
      }
      return null;
    });
    setLocationsState(locState);
  };

  const handleResetClick = () => {
    setLocationsState(locations);
  };

  const handleSearchFocus = () => {
    setModalTitle('Add a location');
  };

  const handleSearchBlur = () => {
    setModalTitle('Location');
  };

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => minHeight}
      initialFocusRef={false}
    >
      <div className={styles.header}>
        <Button variant="ghost" className={styles.headerBack} onClick={onClose}>
          <IconArrowUpward />
        </Button>

        <Typography variant="title2" className={styles.headerTitle}>
          {modalTitle}
        </Typography>

        <Button
          variant="ghost"
          className={styles.reset}
          onClick={handleResetClick}
        >
          Reset
        </Button>
      </div>

      <div className={styles.body}>
        <div className={styles.search}>
          <TextField
            placeholder="Search a location"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            margin="dense"
            className={styles.searchInput}
            InputProps={{
              startAdornment: <SearchIcon height={18} width={18} />,
            }}
          />
        </div>

        <div className={styles.locations}>
          {locationsState.map(({ id, country, city, selected }) => (
            <Chip
              key={id}
              variant="outlined"
              selected={selected}
              icon={
                selected ? <CheckIcon /> : <AddIcon height={18} width={18} />
              }
              label={city ? `${city}, ${country}` : country}
              onClick={() => handleLocationClick(id)}
              clickable
            />
          ))}
        </div>

        <Button
          variant="primary"
          type="submit"
          onClick={onSubmit}
          fullWidth
          className={styles.submit}
        >
          Save
        </Button>
      </div>
    </BottomSheet>
  );
};

export default LocationModal;
