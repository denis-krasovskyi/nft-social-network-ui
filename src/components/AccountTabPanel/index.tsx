import classNames from 'classnames';
import React from 'react';

import { TabPanel } from 'components/ui-kit/Tabs';

import styles from './AccountTabPanel.module.scss';

const AccountTabPanel: React.FC<AccountTabPanelProps> = ({
  children,
  index,
  value,
  className,
}) => {
  return (
    <TabPanel
      value={value}
      index={index}
      className={classNames(
        value === index ? styles.tabContent : styles.tabContent_display_none,
        className,
      )}
    >
      {children}
    </TabPanel>
  );
};

export enum ACCOUNT_TAB_VALUES {
  VACANCIES,
  REQUESTS_FOR_OFFER,
}

export type AccountTabPanelProps = {
  value: ACCOUNT_TAB_VALUES;
  index: ACCOUNT_TAB_VALUES;
  className?: string;
};

export default AccountTabPanel;
