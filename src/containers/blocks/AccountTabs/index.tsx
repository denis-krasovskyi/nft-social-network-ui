import React, { FC, useEffect, useState } from 'react';
import { useToggle, useUpdateEffect } from 'react-use';
import { useSwipeable } from 'react-swipeable';

import Tabs, { Tab, tabA11yProps } from 'components/ui-kit/Tabs';
import AccountTabPanel, {
  ACCOUNT_TAB_VALUES,
} from 'components/AccountTabPanel';
import Vacancies from 'containers/blocks/Vacancies';
import RequestsForOffer from 'containers/blocks/RequestsForOffer';

import styles from './AccountTabs.module.scss';

const ACCOUNT_TAB_LABELS = {
  VACANCIES: 'Vacancies',
  REQUESTS_FOR_OFFER: 'Requests for offer',
};

const AccountTabs: FC<AccountTabsProps> = ({ onExpand, value }) => {
  const [tabValue, setTabValue] = useState<ACCOUNT_TAB_VALUES>(
    ACCOUNT_TAB_VALUES.VACANCIES,
  );
  const [expanded, toggle] = useToggle(value);
  const handlers = useSwipeable({
    onSwipedDown: () => expanded && toggle(),
    onSwipedUp: () => !expanded && toggle(),
  });

  useEffect(() => {
    onExpand(expanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  useUpdateEffect(() => {
    toggle(value);
  }, [value]);

  const handleTabChange = (_, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <div className={styles.tabs} {...handlers}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={ACCOUNT_TAB_LABELS.VACANCIES}
            {...tabA11yProps(ACCOUNT_TAB_VALUES.VACANCIES)}
          />
          <Tab
            label={ACCOUNT_TAB_LABELS.REQUESTS_FOR_OFFER}
            {...tabA11yProps(ACCOUNT_TAB_VALUES.REQUESTS_FOR_OFFER)}
          />
        </Tabs>
      </div>
      <AccountTabPanel value={tabValue} index={ACCOUNT_TAB_VALUES.VACANCIES}>
        <Vacancies />
      </AccountTabPanel>
      <AccountTabPanel
        value={tabValue}
        index={ACCOUNT_TAB_VALUES.REQUESTS_FOR_OFFER}
      >
        <RequestsForOffer />
      </AccountTabPanel>
    </>
  );
};

export type AccountTabsProps = {
  value: boolean;
  onExpand(value: boolean): void;
};

export default AccountTabs;
