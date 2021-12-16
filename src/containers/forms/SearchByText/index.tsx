import React, { useState } from 'react';
import classNames from 'classnames';

import Chip from 'components/ui-kit/Chip';
import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import SearchAutocomplete from 'components/SearchAutocomplete';

import { ReactComponent as DoneIcon } from 'assets/icons/icon-done.svg';
import { ReactComponent as AddIcon } from 'assets/icons/icon-add.svg';

import styles from './SearchByText.module.scss';

export type SearchItem = {
  label: string;
  id: string | number;
};

const SearchByText: React.FC<SearchByTextProps> = ({
  onSave,
  formId,
  options,
  initialSelectedOptions,
  title,
  resetSelectedBtnId,
  onSearchFocus,
  autocompleteEnabled,
  recommendationsList,
}) => {
  const [search, setSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions,
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(selectedOptions);
      }}
      noValidate
      id={formId}
      className={classNames(styles.root, styles.paddingSide)}
    >
      <button
        type="button"
        hidden
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedOptions(initialSelectedOptions);
        }}
        aria-label="reset selected"
        id={resetSelectedBtnId}
      />

      <div
        className={classNames(styles.inputSpacePlaceholder, {
          [styles.mgBottomSm]: autocompleteEnabled,
          [styles.mgBottomL]: !autocompleteEnabled,
        })}
      />
      <SearchAutocomplete
        InputProps={{
          value: search,
          onChange: (e) => {
            setSearch(e.target.value);
          },
          onFocus: onSearchFocus,
          name: 'search',
          placeholder: `Search a ${title}`,
        }}
        onResetClick={() => {
          setSearch('');
        }}
        className={styles.searchInput}
      />

      {!autocompleteEnabled && (
        <>
          {options.map((item) => {
            const selectedIndex = selectedOptions.findIndex(
              (v) => v.id === item.id,
            );
            const selected = selectedIndex > -1;

            return (
              <Chip
                key={item.id}
                variant="outlined"
                clickable
                selected={selected}
                label={item.label}
                className={classNames(styles.chip, styles.mgBottomSm)}
                classes={{
                  icon: styles.workRightsChipIcon,
                }}
                icon={selected ? <DoneIcon /> : <AddIcon />}
                onClick={() => {
                  if (selected) {
                    setSelectedOptions(
                      selectedOptions.filter((_, i) => i !== selectedIndex),
                    );
                    return;
                  }

                  setSelectedOptions([...selectedOptions, item]);
                }}
              />
            );
          })}

          <div className={styles.submitBtnPlaceholder} />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            className={styles.submitBtn}
          >
            Save
          </Button>
        </>
      )}

      {autocompleteEnabled && (
        <>
          {(recommendationsList || []).length > 0 && (
            <div className={styles.recommendationsList}>
              {recommendationsList?.map((item) => (
                <Button
                  type="button"
                  variant="ghost"
                  key={item.id}
                  size="large"
                  fullWidth
                  className={styles.recommendationsListItem}
                >
                  <Typography variant="body2" component="span">
                    {item.label}
                  </Typography>
                </Button>
              ))}
            </div>
          )}

          {(recommendationsList || []).length === 0 && (
            <Typography variant="subtitle1" textAlign="center" component="p">
              No data
            </Typography>
          )}
        </>
      )}
    </form>
  );
};

type SearchByTextProps = {
  title: string;
  onSave: (selectedOptions: SearchItem[]) => void;
  formId?: string;
  options: SearchItem[];
  initialSelectedOptions: SearchItem[];
  recommendationsList?: { label: React.ReactNode; id: string | number }[];
  onSearchFocus?: React.FocusEventHandler<HTMLInputElement>;
  resetSelectedBtnId?: string;
  autocompleteEnabled?: boolean;
};

export default SearchByText;
