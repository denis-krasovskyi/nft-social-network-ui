import React, { FC, useCallback, useEffect } from 'react';
import { useToggle } from 'react-use';
import classNames from 'classnames';

import NearService from 'services/near';

import AccountTabs from 'containers/blocks/AccountTabs';

import EmptyAvatar from 'assets/images/empty-avatar.svg';

import AccountHeader from './AccountHeader';

import styles from './Account.module.scss';

const Account: FC = () => {
  const [expanded, toggleExpanded] = useToggle(false);

  useEffect(() => {
    const init = async () => {
      console.log(NearService.getWallet().getAccountId());
    };
    init();
  }, []);

  const handleManageVenuesClick = useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);

  const handleExpand = useCallback(
    (value: boolean) => {
      toggleExpanded(value);
    },
    [toggleExpanded],
  );

  return (
    <div
      className={classNames(styles.root, {
        [styles.root_headerPadding]: expanded,
      })}
    >
      <AccountHeader
        tabContentExpanded={expanded}
        onManageVenuesClick={handleManageVenuesClick}
        organizationName="Organization name"
        avatarSrc={EmptyAvatar}
      />
      <AccountTabs onExpand={handleExpand} value={expanded} />
    </div>
  );
};

export default Account;
