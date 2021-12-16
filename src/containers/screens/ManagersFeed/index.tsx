import React, { useState } from 'react';
import classNames from 'classnames';
import { useToggle, useWindowScroll } from 'react-use';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import ReportModal from 'components/ReportModal';
import CandidateCard from 'components/CandidateCard';
import ManagersFeedPreferences, {
  MANAGERS_FEED_SORT_OPTIONS,
} from 'containers/blocks/ManagersFeedPreferences';

import { ReactComponent as ArrowIcon } from 'assets/icons/icon-keyboard_arrow_right.svg';

import FiltersBottomSheet from './FiltersBottomSheet';

import styles from './ManagersFeed.module.scss';

const WINDOW_Y_SCROLL_THRESHOLD = 450;

enum REPORT_STATES {
  default = 'default',
  success = 'success',
}

const ManagersFeedScreen: React.FC = () => {
  const { y: windowYScroll } = useWindowScroll();

  const [showFilters, toggleShowFilters] = useToggle(false);
  const [showReportModal, toggleShowReportModal] = useToggle(false);
  const [reportState, setReportState] = useState<REPORT_STATES>(undefined);

  const [items] = useState(['']);

  return (
    <>
      <ManagersFeedPreferences
        className={styles.preferencesRoot}
        sorted={false}
        filtered={false}
        currentSortValue={MANAGERS_FEED_SORT_OPTIONS.RECOMMENDED}
        filtersAppliedAmount={0}
        onApplyFilterClick={toggleShowFilters}
        sortMenuList={[
          {
            value: MANAGERS_FEED_SORT_OPTIONS.RECOMMENDED,
            label: 'Recommended',
            onClick: (_, closeMenu) => closeMenu?.(),
          },
          {
            value: MANAGERS_FEED_SORT_OPTIONS.MOST_RECENT,
            label: 'Most recent',
            onClick: (_, closeMenu) => closeMenu?.(),
          },
        ]}
      />

      {items.length > 0 ? (
        <div className={styles.listRoot}>
          {items.map((item) => (
            <React.Fragment key={item}>
              <CandidateCard
                fullName="Jenny Wilson"
                jobPosition="Sous chef"
                avatarLink="123"
                isAvailable
                isLiked
                onCopyIdClick={async () => {
                  await navigator.clipboard.writeText('text');
                }}
                onReportClick={(_, closeMenuCb) => {
                  toggleShowReportModal();
                  setReportState(REPORT_STATES.default);
                  closeMenuCb?.();
                }}
                workRights="Australian Citizen"
                specialties={[
                  'fine dining',
                  'asian',
                  'menu planning',
                  'western food',
                  'asian menu planning',
                ]}
                videoResumeLink="https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4#t=0.01"
                className={styles.candidateCardRoot}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className={styles.emptyList}>
          <Typography variant="h2">No candidates yet</Typography>
        </div>
      )}

      <ReportModal
        name="Jenny Wilson"
        isOpen={showReportModal}
        onClose={toggleShowReportModal}
        onSubmit={() => {
          setReportState(REPORT_STATES.success);
        }}
        reportedSuccessfully={reportState === REPORT_STATES.success}
      />

      <FiltersBottomSheet isOpen={showFilters} onClose={toggleShowFilters} />

      <Button
        variant="tertiary"
        size="large"
        aria-label="Back to top"
        className={classNames(styles.backToTopBtn, {
          [styles.visible]: windowYScroll >= WINDOW_Y_SCROLL_THRESHOLD,
        })}
        onClick={() => {
          window.scroll({ top: 0, behavior: 'smooth' });
        }}
      >
        <ArrowIcon className={styles.rotateNegative90} />
      </Button>
    </>
  );
};

export default ManagersFeedScreen;
