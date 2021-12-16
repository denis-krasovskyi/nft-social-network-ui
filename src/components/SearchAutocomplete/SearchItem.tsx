import React from 'react';
import classNames from 'classnames';

import styles from './SearchItem.module.scss';

const SearchItem: React.FC<SearchItemProps> = ({ children, className }) => (
  <div className={classNames(styles.root, className)}>{children}</div>
);

type SearchItemProps = {
  className?: string;
};

export default SearchItem;
