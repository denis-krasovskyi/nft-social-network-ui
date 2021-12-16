import React from 'react';
import classNames from 'classnames';

import { tabPanelA11yProps } from './utils';

import styles from './TabPanel.module.scss';

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  (props, ref) => {
    const { children, value, index, keepMounted, ...otherProps } = props;

    return (
      <div
        {...tabPanelA11yProps(index)}
        hidden={value !== index}
        ref={ref}
        {...otherProps}
        className={classNames(styles.root, otherProps.className)}
      >
        {(value === index || keepMounted) && children}
      </div>
    );
  },
);

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  index: string | number;
  value: string | number;
  keepMounted?: boolean;
}

export default TabPanel;
