import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { BottomSheet } from 'components/ui-kit/ModalSheet';
import Divider from 'components/ui-kit/Divider';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import FeedFilters, {
  FeedFiltersFormValues,
  WORK_RIGHTS,
  WORK_STATUS,
} from 'containers/forms/FeedFilters';

import styles from './FiltersBottomSheet.module.scss';

const FiltersBottomSheet: React.FC<FiltersBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const formik = useFormik<FeedFiltersFormValues>({
    initialValues: {
      status: WORK_STATUS.allStatuses,
      workRights: [WORK_RIGHTS.all],
      experience: [],
    },
    onSubmit: () => null,
  });

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => minHeight}
      initialFocusRef={false}
    >
      <div className={styles.head}>
        <Typography variant="title1">Filter by</Typography>

        <Button>
          <Typography
            variant="button"
            component="span"
            className={styles.resetBtnText}
          >
            Clear filters
          </Typography>
        </Button>
      </div>

      <Divider className={classNames(styles.divider, styles.mgBottom)} />

      <FeedFilters formik={formik} />
    </BottomSheet>
  );
};

type FiltersBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default FiltersBottomSheet;
