import React, { useState } from 'react';
import classNames from 'classnames';
import { useToggle } from 'react-use';

import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Avatar from 'components/ui-kit/Avatar';
import Chip from 'components/ui-kit/Chip';

import VideoPlayer from 'components/VideoPlayer';

import { ReactComponent as HeartFilledIcon } from 'assets/icons/icon-heart_filled.svg';
import { ReactComponent as HeartOutlinedIcon } from 'assets/icons/icon-heart_outline.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';
import { ReactComponent as AvailableIcon } from 'assets/icons/icon-available.svg';
import { ReactComponent as NotAvailableIcon } from 'assets/icons/icon-not_available.svg';
import { ReactComponent as LocationMarkIcon } from 'assets/icons/icon-location.svg';

import MoreMenu from './MoreMenu';

import styles from './CandidateCard.module.scss';

const CandidateCard: React.FC<CandidateCardProps> = ({
  avatarLink,
  videoResumeLink,
  className,
  jobPosition,
  fullName,
  hideMoreMenu,
  offerRequestHasBeenSent,
  isLiked,
  isAvailable,
  showSpecialitiesInTheEnd,
  onCopyIdClick,
  onReportClick,
  onShareClick,
  onRequestForOfferClick,
  workRights,
  specialties,
  experience,
  location,
  bio,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [showCopiedText, toggleShowCopiedText] = useToggle(false);

  const menuIsOpen = Boolean(menuAnchorEl);

  const openMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className={classNames(className)}>
      {videoResumeLink && (
        <div className={styles.videoWrap}>
          <VideoPlayer videoLink={videoResumeLink} />
        </div>
      )}

      <div className={styles.infoWrap}>
        <div className={styles.basicInfo}>
          <div className={styles.personalInfoWrap}>
            <div className={styles.avatarWrap}>
              <Avatar alt={fullName} src={avatarLink} />
            </div>

            <div className={styles.personalWrap}>
              <Typography variant="title2" component="p">
                {fullName}
              </Typography>
              <Typography variant="caption">{jobPosition}</Typography>
            </div>
          </div>

          {!hideMoreMenu && (
            <>
              <Button
                variant="ghost"
                onClick={openMenuClick}
                className={classNames({ [styles.menuOpenBtn]: menuIsOpen })}
              >
                <MoreIcon />
              </Button>

              <MoreMenu
                menuAnchorEl={menuAnchorEl}
                menuIsOpen={menuIsOpen}
                handleMenuClose={handleMenuClose}
                showCopiedText={showCopiedText}
                onShareClick={(e) => onShareClick?.(e, handleMenuClose)}
                onCopyIdClick={(e) => {
                  toggleShowCopiedText();
                  onCopyIdClick?.(e, handleMenuClose);

                  setTimeout(toggleShowCopiedText, 5000);
                }}
                onReportClick={(e) => onReportClick?.(e, handleMenuClose)}
              />
            </>
          )}
        </div>

        <div className={classNames(styles.mgTop, styles.jobInfoWrap)}>
          <div className={styles.jobInfoHalf}>
            <Typography variant="subtitle4" component="p">
              Status
            </Typography>
            <Typography variant="caption" alignContent="center" display="flex">
              {isAvailable ? (
                <AvailableIcon className={styles.iconStatus} />
              ) : (
                <NotAvailableIcon className={styles.iconStatus} />
              )}
              {isAvailable ? 'Available' : 'Not available'}
            </Typography>
          </div>

          <div className={styles.jobInfoHalf}>
            <Typography variant="subtitle4" component="p">
              Work Rights
            </Typography>

            {workRights && (
              <Chip label={workRights} variant="filled" color="secondary" />
            )}
          </div>
        </div>

        {!showSpecialitiesInTheEnd && (
          <div className={styles.mgTop}>
            <Typography variant="subtitle4" component="p">
              Specialties
            </Typography>

            {specialties && (
              <div className={styles.specialityList}>
                {specialties.map((speciality) => (
                  <Chip
                    key={speciality}
                    label={speciality}
                    variant="filled"
                    color="secondary"
                    className={styles.specialityChip}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className={classNames(styles.mainActions, styles.mgTopLg)}>
          <Button
            variant="secondary"
            fullWidth
            startIcon={
              isLiked ? (
                <HeartFilledIcon className={styles.colorIconRed} />
              ) : (
                <HeartOutlinedIcon className={styles.colorOrangePeel} />
              )
            }
          >
            Like
          </Button>

          {onRequestForOfferClick && (
            <Button
              variant="tertiary"
              fullWidth
              onClick={onRequestForOfferClick}
              disabled={offerRequestHasBeenSent}
              className={styles.requestOfferBtn}
            >
              {offerRequestHasBeenSent ? 'Request sent' : 'Request for offer'}
            </Button>
          )}
        </div>

        {showSpecialitiesInTheEnd && (
          <div className={styles.mgTopLg}>
            <Typography
              variant="subtitle4"
              component="p"
              className={styles.mgBottom}
            >
              Specialties
            </Typography>

            {specialties && (
              <div
                className={classNames(
                  styles.specialityList,
                  styles.specialityListWrap,
                )}
              >
                {specialties.map((speciality) => (
                  <Chip
                    key={speciality}
                    label={speciality}
                    variant="filled"
                    color="secondary"
                    className={styles.specialityChip}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {experience && (
          <div className={styles.mgTop}>
            <Typography
              variant="subtitle4"
              component="p"
              className={styles.mgBottom}
            >
              Experience
            </Typography>

            {experience.map((item) => (
              <div key={item.key} className={styles.experianceListItem}>
                <Typography
                  variant="title3"
                  component="span"
                  className={styles.experianceListItemTitle}
                >
                  {item.organization}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  className={styles.experianceListItemSubTitle}
                >
                  {item.role}
                </Typography>
                <Typography
                  variant="caption2"
                  component="span"
                  className={styles.colorGrey}
                >
                  {item.period}
                </Typography>
              </div>
            ))}
          </div>
        )}

        {location?.label && (
          <div className={styles.mgTopM}>
            <Typography variant="subtitle4" component="p" marginBottom="4px">
              Location
            </Typography>

            <Typography variant="body2" alignItems="center" display="flex">
              <LocationMarkIcon className={styles.locationMarkIcon} />{' '}
              {location.label}
            </Typography>
          </div>
        )}

        {bio && (
          <div className={styles.mgTop}>
            <Typography variant="subtitle4" component="p" marginBottom="4px">
              Bio
            </Typography>
            <Typography variant="body2" marginBottom="28px">
              {bio}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

type CandidateCardProps = {
  className?: string;
  isLiked?: boolean;
  isAvailable?: boolean;
  videoResumeLink?: string;
  avatarLink?: string;
  workRights?: string;
  fullName: string;
  jobPosition: string;
  specialties?: string[];
  hideMoreMenu?: boolean;
  offerRequestHasBeenSent?: boolean;
  showSpecialitiesInTheEnd?: boolean;
  experience?: {
    key: string;
    organization: React.ReactNode;
    role: React.ReactNode;
    period: React.ReactNode;
  }[];
  location?: { label: string };
  bio?: React.ReactNode;
  onRequestForOfferClick?: React.MouseEventHandler<HTMLButtonElement>;
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

export { default as MoreMenu } from './MoreMenu';
export default CandidateCard;
