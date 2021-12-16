import React, { useState } from 'react';
import classNames from 'classnames';
import { useToggle, useWindowScroll } from 'react-use';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import ReportModal from 'components/ReportModal';
import SavedCandidateItem, {
  SAVED_ITEM_STATUS,
} from 'components/SavedCandidateItem';
import ManagersFeedPreferences, {
  MANAGERS_FEED_SORT_OPTIONS,
} from 'containers/blocks/ManagersFeedPreferences';

import Tabs, { Tab, tabA11yProps } from 'components/ui-kit/Tabs';

import { ReactComponent as ArrowIcon } from 'assets/icons/icon-keyboard_arrow_right.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/icon-close.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/icon-email.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/icon-share.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';

import FiltersBottomSheet from './FiltersBottomSheet';

import styles from './ManageSaved.module.scss';

const WINDOW_Y_SCROLL_THRESHOLD = 450;

enum REPORT_STATES {
  default = 'default',
  success = 'success',
}

const SAVED_TAB_LABELS = {
  ALL: 'All saved',
  REQUESTS_FOR_OFFER: 'Requests for the offer',
};
export enum SAVED_TAB_VALUES {
  ALL,
  REQUESTS_FOR_OFFER,
}
type SavedItem = {
  id: number;
  name: string;
  jobPosition: string;
  videoResumeLink: string;
  isAvailable: boolean;
  requestStatus: null | SAVED_ITEM_STATUS;
};

const mockItems: SavedItem[] = [
  {
    id: 1,
    name: 'John Doe',
    jobPosition: 'Sous chef',
    videoResumeLink: '123',
    isAvailable: true,
    requestStatus: SAVED_ITEM_STATUS.ACCEPTED,
  },
  {
    id: 2,
    name: 'John Doe 2',
    jobPosition: 'Sous chef',
    videoResumeLink: '123',
    isAvailable: true,
    requestStatus: SAVED_ITEM_STATUS.SENT,
  },
  {
    id: 3,
    name: 'John Doe ',
    jobPosition: 'Sous chef',
    videoResumeLink: '123',
    isAvailable: true,
    requestStatus: null,
  },
  {
    id: 4,
    name: 'John Doe ',
    jobPosition: 'Sous chef',
    videoResumeLink: '123',
    isAvailable: true,
    requestStatus: SAVED_ITEM_STATUS.SENT,
  },
];

const ManageSavedScreen: React.FC = () => {
  const { y: windowYScroll } = useWindowScroll();

  const [showFilters, toggleShowFilters] = useToggle(false);
  const [showReportModal, toggleShowReportModal] = useToggle(false);
  const [reportState, setReportState] = useState<REPORT_STATES>(undefined);
  const [activeTab, setActiveTab] = useState(0);
  const [inSelectMode, setInSelectMode] = useToggle(true);
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);

  const onSelectItemCallback = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((el) => el !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <ManagersFeedPreferences
        className={styles.preferencesRoot}
        sorted={false}
        filtered={false}
        currentSortValue={MANAGERS_FEED_SORT_OPTIONS.MOST_RECENT}
        filtersAppliedAmount={0}
        onApplyFilterClick={toggleShowFilters}
        sortMenuList={[
          {
            value: MANAGERS_FEED_SORT_OPTIONS.MOST_RECENT,
            label: 'Recently added',
            onClick: (_, closeMenu) => closeMenu?.(),
          },
          {
            value: MANAGERS_FEED_SORT_OPTIONS.FIRST_NAME,
            label: 'First name',
            onClick: (_, closeMenu) => closeMenu?.(),
          },
          {
            value: MANAGERS_FEED_SORT_OPTIONS.LAST_NAME,
            label: 'Last name',
            onClick: (_, closeMenu) => closeMenu?.(),
          },
        ]}
      />

      {inSelectMode ? (
        <div className={styles.multiselectBlock}>
          <Button
            size="small"
            variant="ghost"
            className={styles.multiselectBlockButton}
            onClick={() => {
              setSelectedItems([]);

              setInSelectMode(false);
            }}
          >
            <CloseIcon />
          </Button>

          <Typography variant="title2" className={styles.multiselectBlockCount}>
            {selectedItems.length}
          </Typography>

          <Button
            size="small"
            variant="ghost"
            className={styles.multiselectBlockButton}
          >
            <EmailIcon />
          </Button>

          <Button
            size="small"
            variant="ghost"
            className={classNames(
              styles.multiselectBlockButton,
              styles.multiselectBlockButtonShare,
            )}
          >
            <ShareIcon />
          </Button>

          <Button
            size="small"
            variant="ghost"
            className={styles.multiselectBlockButton}
          >
            <DeleteIcon />
          </Button>
        </div>
      ) : (
        <Tabs
          aria-label="tabs"
          className={styles.tabs}
          value={activeTab}
          onChange={(e, tab) => setActiveTab(tab)}
        >
          <Tab
            label={SAVED_TAB_LABELS.ALL}
            {...tabA11yProps(SAVED_TAB_LABELS.ALL)}
          />

          <Tab
            label={SAVED_TAB_VALUES.REQUESTS_FOR_OFFER}
            {...tabA11yProps(SAVED_TAB_VALUES.REQUESTS_FOR_OFFER)}
          />
        </Tabs>
      )}

      {mockItems.length > 0 ? (
        <div className={styles.wrapper}>
          <Typography variant="subtitle4">{mockItems.length} saved</Typography>

          <div className={styles.listRoot}>
            {mockItems.map((item) => (
              <React.Fragment key={item.id.toString()}>
                <SavedCandidateItem
                  fullName="Jenny Wilson"
                  jobPosition="Sous chef"
                  requestStatus={item.requestStatus}
                  isAvailable
                  id={item.id}
                  onCopyIdClick={async () => {
                    await navigator.clipboard.writeText('text');
                  }}
                  inSelectMode={inSelectMode}
                  isSelected={selectedItems.includes(item.id)}
                  onSelectCallback={onSelectItemCallback}
                  onLongpressCallback={() => setInSelectMode(true)}
                  onReportClick={(_, closeMenuCb) => {
                    toggleShowReportModal();
                    setReportState(REPORT_STATES.default);
                    closeMenuCb?.();
                  }}
                  videoResumeLink="https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4#t=0.01"
                  className={styles.candidateCardRoot}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyList}>
          <Typography variant="h2">No saved candidates</Typography>
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

export default ManageSavedScreen;
