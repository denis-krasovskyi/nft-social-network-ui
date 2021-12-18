import React, { useState } from 'react';

import { ReactComponent as IconSearch } from 'assets/icons/icon-search.svg';
import { ReactComponent as IconSearchActive } from 'assets/icons/icon-search-active.svg';
import { ReactComponent as IconCrossRounded } from 'assets/icons/icon-cross-rounded.svg';

import classNames from 'classnames';
import styles from './Search.module.scss';
import Button from '../ui-kit/Button';

const SearchComponent: React.FC<SearchComponentProps> = ({
  className,
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (val) => {
    setSearchValue(val);

    onChange(val);
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.inputWrapper}>
        {searchValue !== '' ? (
          <IconSearchActive className={styles.searchIcon} />
        ) : (
          <IconSearch className={styles.searchIcon} />
        )}
        <input
          className={styles.input}
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        {searchValue !== '' && (
          <Button
            variant="ghost"
            className={styles.clearButton}
            onClick={() => handleChange('')}
          >
            <IconCrossRounded className={styles.clearButtonIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

type SearchComponentProps = {
  className?: string;
  onChange: (val: string) => void;
};

export default SearchComponent;
