import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';
import { useToggle, useLongPress } from 'react-use';

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'components/SwipableList';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Menu from 'components/ui-kit/Menu';
import MenuItem from 'components/ui-kit/MenuItem';
import Divider from 'components/ui-kit/Divider';
import Checkbox from 'components/ui-kit/Checkbox';

import VideoPlayer from 'components/VideoPlayer';

import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/icon-share.svg';
import { ReactComponent as ContentCopyIcon } from 'assets/icons/icon-content-copy.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/icon-warning.svg';
import { ReactComponent as AvailableIcon } from 'assets/icons/icon-available.svg';
import { ReactComponent as NotAvailableIcon } from 'assets/icons/icon-not_available.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/icon-email.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import { ReactComponent as RequestAcceptedIcon } from 'assets/icons/icon-request-accepted.svg';
import { ReactComponent as RequestSentIcon } from 'assets/icons/icon-request-sent.svg';

import styles from './SavedCandidateItem.module.scss';

export enum SAVED_ITEM_STATUS {
  ACCEPTED = 'accepted',
  SENT = 'sent',
}

const getRequestStatusContent = (status?: string | null): ReactElement => {
  switch (status) {
    case SAVED_ITEM_STATUS.SENT:
      return (
        <div className={classNames(styles.request, styles.requestSent)}>
          <RequestSentIcon />

          <Typography variant="caption" component="p">
            Request sent
          </Typography>
        </div>
      );
    case SAVED_ITEM_STATUS.ACCEPTED:
      return (
        <div className={classNames(styles.request, styles.requestAccepted)}>
          <RequestAcceptedIcon />

          <Typography variant="caption" component="p">
            Request accepted
          </Typography>
        </div>
      );
    default:
      return <>{null}</>;
  }
};

const LeadingActionsWrapper: React.FC = () => (
  <LeadingActions>
    <SwipeAction onClick={() => null}>
      <div className={styles.leadingAction}>
        <EmailIcon fill="white" />
        <Typography
          variant="button2"
          component="p"
          className={styles.swipeActionText}
        >
          Request <br />
          for offer
        </Typography>
      </div>
    </SwipeAction>
  </LeadingActions>
);

const TrailingActionsWrapper: React.FC = () => (
  <TrailingActions>
    <SwipeAction onClick={() => null}>
      <div className={styles.trailingAction}>
        <DeleteIcon fill="white" />
        <Typography
          variant="button2"
          component="p"
          className={styles.swipeActionText}
        >
          Remove
        </Typography>
      </div>
    </SwipeAction>
  </TrailingActions>
);

const DEFAULT_OPTIONS = {
  isPreventDefault: false,
  delay: 300,
};

const SavedCandidateItem: React.FC<SavedCandidateItemProps> = ({
  videoResumeLink,
  id,
  className,
  jobPosition,
  fullName,
  onCopyIdClick,
  onReportClick,
  onShareClick,
  isAvailable,
  requestStatus,
  onLongpressCallback,
  inSelectMode,
  isSelected,
  onSelectCallback,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [showCopiedText, toggleShowCopiedText] = useToggle(false);

  const longPressEvent = useLongPress(onLongpressCallback, DEFAULT_OPTIONS);

  const menuIsOpen = Boolean(menuAnchorEl);

  const openMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className={classNames(styles.card, className)}>
      <SwipeableList type={ListType.IOS}>
        <SwipeableListItem
          leadingActions={<LeadingActionsWrapper />}
          trailingActions={<TrailingActionsWrapper />}
        >
          <div className={styles.content} {...longPressEvent}>
            <div className={styles.videoWrap}>
              <VideoPlayer videoLink={videoResumeLink} />
            </div>

            <div className={styles.infoWrap}>
              <Typography variant="title2" component="p">
                {fullName}
              </Typography>
              <Typography variant="caption">{jobPosition}</Typography>

              <Typography
                variant="subtitle4"
                component="p"
                className={styles.statusMg}
              >
                Status
              </Typography>
              <Typography
                variant="caption"
                alignContent="center"
                display="flex"
              >
                {isAvailable ? (
                  <AvailableIcon className={styles.iconStatus} />
                ) : (
                  <NotAvailableIcon className={styles.iconStatus} />
                )}
                {isAvailable ? 'Available' : 'Not available'}
              </Typography>
            </div>

            {inSelectMode ? (
              <Checkbox
                value={isSelected}
                onChange={() => onSelectCallback(id)}
                className={styles.menuTrigger}
              />
            ) : (
              <Button
                variant="ghost"
                onClick={openMenuClick}
                className={classNames(styles.menuTrigger, {
                  [styles.menuOpenBtn]: menuIsOpen,
                })}
              >
                <MoreIcon />
              </Button>
            )}
            <Menu
              anchorEl={menuAnchorEl}
              open={menuIsOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ horizontal: 20, vertical: 45 }}
            >
              <MenuItem>
                <Button
                  onClick={(e) => onShareClick?.(e, handleMenuClose)}
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
                  onClick={(e) => {
                    toggleShowCopiedText();
                    onCopyIdClick?.(e, handleMenuClose);

                    setTimeout(toggleShowCopiedText, 5000);
                  }}
                  startIcon={
                    <ContentCopyIcon className={styles.menuItemIcon} />
                  }
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
                  onClick={(e) => onReportClick?.(e, handleMenuClose)}
                  startIcon={
                    <WarningIcon
                      className={classNames(
                        styles.colorIconRed,
                        styles.menuItemIcon,
                      )}
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
          </div>
        </SwipeableListItem>
      </SwipeableList>

      {getRequestStatusContent(requestStatus)}
    </div>
  );
};

type SavedCandidateItemProps = {
  className?: string;
  isAvailable?: boolean;
  videoResumeLink?: string;
  fullName: string;
  id: number;
  jobPosition: string;
  requestStatus: null | string;
  onLongpressCallback: () => void;
  inSelectMode: boolean;
  isSelected: boolean;
  onSelectCallback: (id: number) => void;
  onCopyIdClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    closeMenuCb?: () => void,
  ) => void;
  onShareClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    closeMenuCb?: () => void,
  ) => void;
  onReportClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    closeMenuCb?: () => void,
  ) => void;
};

export default SavedCandidateItem;
