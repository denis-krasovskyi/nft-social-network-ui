import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/ui-kit/Button';
import Avatar from 'components/ui-kit/Avatar';
import Typography from 'components/ui-kit/Typography';
import Divider from 'components/ui-kit/Divider';
import Menu from 'components/ui-kit/Menu';
import MenuItem from 'components/ui-kit/MenuItem';

import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/icon-settings.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/icon-share.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/icon-content-copy.svg';
import { ReactComponent as VenueIcon } from 'assets/icons/icon-Venue_3.svg';

import styles from './AccountHeader.module.scss';

const AccountHeader: FC<AccountHeaderProps> = ({
  organizationName,
  avatarSrc,
  tabContentExpanded,
  onManageVenuesClick,
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header
        className={classNames(styles.header, {
          [styles.header_fixed]: tabContentExpanded,
        })}
      >
        <div
          className={classNames(styles.headerBg, {
            [styles.headerBg_hidden]: tabContentExpanded,
          })}
        />
        <Button
          variant="ghost"
          className={classNames(styles.manageVenuesIconBtn, {
            [styles.manageVenuesIconBtn_disabled]: !tabContentExpanded,
          })}
          onClick={onManageVenuesClick}
        >
          <VenueIcon />
        </Button>
        <Avatar
          src={avatarSrc}
          className={classNames(styles.largeAvatar, {
            [styles.largeAvatar_hidden]: tabContentExpanded,
          })}
        />
        <div
          className={classNames(styles.fixedProfileInfo, {
            [styles.fixedProfileInfo_hidden]: !tabContentExpanded,
          })}
        >
          <Avatar src={avatarSrc} className={styles.smallAvatar} />
          <Typography variant="title2">{organizationName}</Typography>
        </div>
        <Button variant="ghost" onClick={handleMoreClick}>
          <MoreIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Button
              onClick={() => history.push('/cabinet/account-edit')}
              startIcon={<EditIcon className={styles.menuItemIcon} />}
              className={styles.menuItemBtn}
              fullWidth
            >
              <Typography variant="body2" component="span">
                Edit profile
              </Typography>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              startIcon={<SettingsIcon className={styles.menuItemIcon} />}
              className={styles.menuItemBtn}
              fullWidth
            >
              <Typography variant="body2" component="span">
                Settings
              </Typography>
            </Button>
          </MenuItem>
          <Divider component="li" />
          <MenuItem>
            <Button
              startIcon={<ShareIcon className={styles.menuItemIcon} />}
              className={styles.menuItemBtn}
              fullWidth
            >
              <Typography variant="body2" component="span">
                Share my profile
              </Typography>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              startIcon={<CopyIcon className={styles.menuItemIcon} />}
              className={styles.menuItemBtn}
              fullWidth
            >
              <Typography variant="body2" component="span">
                Copy profile link
              </Typography>
            </Button>
          </MenuItem>
        </Menu>
      </header>
      <div
        className={classNames(styles.info, {
          [styles.info_hidden]: tabContentExpanded,
        })}
      >
        <Typography variant="title1" align="center">
          {organizationName}
        </Typography>
        <Button
          startIcon={<VenueIcon />}
          variant="tertiary"
          size="large"
          className={styles.manageVenuesBtn}
          onClick={onManageVenuesClick}
          fullWidth
        >
          Manage venues
        </Button>
      </div>
    </>
  );
};

export type AccountHeaderProps = {
  tabContentExpanded: boolean;
  organizationName: string;
  avatarSrc: string;
  onManageVenuesClick(): void;
};

export default AccountHeader;
