import React from 'react';
import { useFormik, FormikConfig } from 'formik';
import classNames from 'classnames';

import { ReactComponent as IconArrowUpward } from 'assets/icons/icon-arrow_upward.svg';

import { BottomSheet } from 'components/ui-kit/ModalSheet';
import Typography from 'components/ui-kit/Typography';
import TextField from 'components/ui-kit/TextField';
import Button from 'components/ui-kit/Button';

import styles from './ReportModal.module.scss';

const MAX_LENGTH = 500;

const ReportModal: React.FC<ReportModalProps> = ({
  name,
  onClose,
  onSubmit,
  isOpen,
  reportedSuccessfully,
}) => {
  const formik = useFormik<ReportFormValues>({
    initialValues: {
      description: '',
    },
    onSubmit,
  });

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => minHeight}
      initialFocusRef={false}
    >
      <div className={styles.header}>
        <Button variant="ghost" className={styles.headerBack} onClick={onClose}>
          <IconArrowUpward />
        </Button>

        <Typography variant="title2" className={styles.headerTitle}>
          Report {name}
        </Typography>
      </div>

      {!reportedSuccessfully && (
        <form onSubmit={formik.handleSubmit} noValidate className={styles.body}>
          <Typography variant="title1" className={styles.bodyTitle}>
            Why are you reporting {name}?
          </Typography>

          <TextField
            multiline
            rows={5}
            InputProps={{
              name: 'description',
              value: formik.values.description,
              onChange: (e) => {
                formik.setFieldValue(
                  'description',
                  e.target.value.slice(0, MAX_LENGTH),
                );
              },
              onBlur: formik.handleBlur,
            }}
            FormHelperTextProps={{
              className: classNames(
                styles.lengthHelpText,
                styles.textAlightRight,
              ),
            }}
            helperText={
              <Typography
                variant="subtitle4"
                component="span"
                className={styles.colorGrey}
              >
                {formik.values.description.length}/{MAX_LENGTH}
              </Typography>
            }
            label="Report description"
            className={styles.textarea}
          />

          <Button
            variant="primary"
            type="submit"
            fullWidth
            disabled={formik.isSubmitting}
            className={styles.submit}
          >
            Report
          </Button>
        </form>
      )}

      {reportedSuccessfully && (
        <div className={styles.successBlock}>
          <Typography
            variant="title1"
            textAlign="center"
            className={styles.bodyTitle}
          >
            Thanks for your report.
          </Typography>

          <Typography variant="body2">We’ll look into this soon.</Typography>
        </div>
      )}
    </BottomSheet>
  );
};

type ReportFormValues = {
  description: string;
};

type ReportModalProps = {
  name: string;
  onSubmit: FormikConfig<ReportFormValues>['onSubmit'];
  isOpen: boolean;
  onClose: () => void;
  reportedSuccessfully?: boolean;
};

export default ReportModal;
