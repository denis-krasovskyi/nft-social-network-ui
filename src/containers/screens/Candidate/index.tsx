import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';

import Button from 'components/ui-kit/Button';
import ReportModal from 'components/ReportModal';
import ScreenHeader from 'components/ScreenHeader';
import CandidateCard, { MoreMenu } from 'components/CandidateCard';

import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';

import styles from './Candidate.module.scss';

enum REPORT_STATES {
  default = 'default',
  success = 'success',
}

const CandidateScreen: React.FC = () => {
  const history = useHistory();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [showCopiedText, toggleShowCopiedText] = useToggle(false);

  const [reportState, setReportState] = useState<REPORT_STATES>(undefined);
  const [showReportModal, toggleShowReportModal] = useToggle(false);

  const menuIsOpen = Boolean(menuAnchorEl);

  const openMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <ScreenHeader
        onBackButtonClick={() => {
          history.goBack();
        }}
        right={
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
              onCopyIdClick={() => {
                toggleShowCopiedText();

                setTimeout(toggleShowCopiedText, 5000);
              }}
              onReportClick={() => {
                handleMenuClose();
                setReportState(undefined);
                toggleShowReportModal(true);
              }}
            />
          </>
        }
        className={styles.head}
      />

      <CandidateCard
        fullName="Jenny Wilson"
        jobPosition="Sous chef"
        avatarLink="123"
        hideMoreMenu
        workRights="Australian Citizen"
        specialties={[
          'fine dining',
          'asian',
          'menu planning',
          'western food',
          'asian menu planning',
        ]}
        videoResumeLink="https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4#t=0.01"
        onRequestForOfferClick={() => null}
        offerRequestHasBeenSent
        showSpecialitiesInTheEnd
        isLiked
        experience={[
          {
            organization: 'Organization',
            role: 'Job role',
            period: 'Dec 2018 - Nov 2021 • 2 years 11 months ',
            key: '1',
          },
          {
            organization: 'Organization',
            role: 'Job role',
            period: 'Dec 2018 - Nov 2021 • 2 years 11 months ',
            key: '2',
          },
        ]}
        location={{
          label: 'City, Country',
        }}
        bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hac porttitor volutpat odio est sed egestas. Ligula etiam pellentesque sit consectetur."
        className={styles.candidateCardRoot}
      />

      <ReportModal
        name="Jenny Wilson"
        isOpen={showReportModal}
        onClose={toggleShowReportModal}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          setReportState(REPORT_STATES.success);
        }}
        reportedSuccessfully={reportState === REPORT_STATES.success}
      />
    </>
  );
};

export default CandidateScreen;
