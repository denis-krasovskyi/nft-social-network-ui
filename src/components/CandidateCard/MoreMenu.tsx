import React from 'react';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Menu from 'components/ui-kit/Menu';
import MenuItem from 'components/ui-kit/MenuItem';
import Divider from 'components/ui-kit/Divider';

import { ReactComponent as ShareIcon } from 'assets/icons/icon-share.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/icon-warning.svg';
import { ReactComponent as ContentCopyIcon } from 'assets/icons/icon-content-copy.svg';

import styles from './CandidateCard.module.scss';

const MoreMenu: React.FC<MoreMenuProps> = ({
  menuIsOpen,
  showCopiedText,
  menuAnchorEl,
  handleMenuClose,
  onCopyIdClick,
  onShareClick,
  onReportClick,
}) => {
  return (
    <>
      <Menu
        anchorEl={menuAnchorEl}
        open={menuIsOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ horizontal: 20, vertical: 45 }}
      >
        <MenuItem>
          <Button
            onClick={onShareClick}
            startIcon={<ShareIcon className={styles.menuItemIcon} />}
            fullWidth
            size="large"
            className={styles.menuItemBtn}
          >
            <Typography variant="body2" component="span">
              Share the candidate
            </Typography>
          </Button>
        </MenuItem>

        <MenuItem>
          <Button
            onClick={onCopyIdClick}
            startIcon={<ContentCopyIcon className={styles.menuItemIcon} />}
            fullWidth
            size="large"
            className={styles.menuItemBtn}
          >
            <Typography
              variant="body2"
              component="span"
              className={classNames({
                [styles.colorSuccess]: showCopiedText,
              })}
            >
              {showCopiedText ? 'Copied!' : 'Copy candidate ID'}
            </Typography>
          </Button>
        </MenuItem>

        <Divider component="li" />

        <MenuItem>
          <Button
            onClick={onReportClick}
            startIcon={
              <WarningIcon
                className={classNames(styles.colorIconRed, styles.menuItemIcon)}
              />
            }
            fullWidth
            size="large"
            className={styles.menuItemBtn}
          >
            <Typography variant="body2" component="span">
              Report
            </Typography>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

type MoreMenuProps = {
  menuIsOpen: boolean;
  showCopiedText?: boolean;
  menuAnchorEl: React.ComponentProps<typeof Menu>['anchorEl'];
  handleMenuClose: React.ComponentProps<typeof Menu>['onClose'];
  onCopyIdClick?: React.MouseEventHandler<HTMLButtonElement>;
  onShareClick?: React.MouseEventHandler<HTMLButtonElement>;
  onReportClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default MoreMenu;
