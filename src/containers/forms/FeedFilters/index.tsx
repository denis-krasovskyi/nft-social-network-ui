import React from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';

import Divider from 'components/ui-kit/Divider';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Chip from 'components/ui-kit/Chip';

import WorkRights, { WORK_RIGHTS } from './WorkRights';
import Experience, { EXPERIENCE, ExperienceValue } from './Experience';

import styles from './FeedFilters.module.scss';

export enum WORK_STATUS {
  allStatuses,
  available,
  notAvailable,
}

export type FeedFiltersFormValues = {
  status: WORK_STATUS;
  workRights: WORK_RIGHTS[];
  experience: ExperienceValue[];
};

const FeedFilters: React.FC<FeedFilterProps> = ({
  formId,
  formik,
  vacancies,
  locations,
  specialties,
}) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      noValidate
      id={formId}
    >
      <div className={classNames(styles.paddingSide, styles.mgBottom)}>
        <Typography
          variant="subtitle4"
          className={classNames(styles.mgBottomSm, styles.fontBold)}
        >
          Status
        </Typography>

        <div>
          {[
            {
              label: 'All statuses',
              value: WORK_STATUS.allStatuses,
              className: styles.chip,
            },
            {
              label: 'Available for work',
              value: WORK_STATUS.available,
              className: styles.chip,
            },
            {
              label: 'Not available',
              value: WORK_STATUS.notAvailable,
            },
          ].map((item) => (
            <Chip
              key={item.label}
              variant="outlined"
              clickable
              selected={formik.values.status === item.value}
              label={item.label}
              className={item.className}
              onClick={() => {
                if (formik.values.status === item.value) {
                  formik.setFieldValue('status', WORK_STATUS.allStatuses);
                  return;
                }

                formik.setFieldValue('status', item.value);
              }}
            />
          ))}
        </div>
      </div>

      <Divider className={classNames(styles.divider, styles.mgBottom)} />

      <WorkRights
        currentValue={formik.values.workRights}
        list={[
          {
            label: 'All work rights',
            value: WORK_RIGHTS.all,
          },
          {
            label: 'Visa with limited work rights',
            value: WORK_RIGHTS.visaLimited,
          },
          {
            label: 'Australian Citizen',
            value: WORK_RIGHTS.australian,
          },
          {
            label: 'Visa with work rights',
            value: WORK_RIGHTS.visa,
          },
          {
            label: 'PR',
            value: WORK_RIGHTS.pr,
          },
          {
            label: 'Not known',
            value: WORK_RIGHTS.notKnown,
          },
        ]}
        onItemClick={(_, { selected, value }) => {
          if (selected) {
            const nextValue = formik.values.workRights.filter(
              (i) => i !== value,
            );

            formik.setFieldValue(
              'workRights',
              nextValue.length === 0 ? [WORK_RIGHTS.all] : nextValue,
            );
            return;
          }

          if (value === WORK_RIGHTS.all) {
            formik.setFieldValue('workRights', [value]);
            return;
          }

          formik.setFieldValue('workRights', [
            ...formik.values.workRights.filter((i) => i !== WORK_RIGHTS.all),
            value,
          ]);
        }}
      />

      <Divider className={classNames(styles.divider, styles.mgBottom)} />
      {vacancies}
      <Divider className={classNames(styles.divider, styles.mgBottom)} />
      {specialties}
      <Divider className={classNames(styles.divider, styles.mgBottom)} />
      {locations}
      <Divider className={classNames(styles.divider, styles.mgBottom)} />

      <Experience
        currentValue={formik.values.experience}
        list={[
          { value: EXPERIENCE['<1'], label: '< 1 year' },
          { value: EXPERIENCE['1-3'], label: '1-3 years' },
          { value: EXPERIENCE['3-5'], label: '3-5 years' },
          { value: EXPERIENCE['5-7'], label: '5-7 years' },
          { value: EXPERIENCE['7-10'], label: '7-10 years' },
        ]}
        onValueChange={(nextValue) => {
          formik.setFieldValue('experience', nextValue);
        }}
        onCustomValueChange={(nextValue, { index, type }) => {
          if (type) {
            formik.setFieldValue(`experience[${index}].${type}`, nextValue);
          }
        }}
        onResetClick={(e, i) => {
          formik.setFieldValue(`experience[${i}]`, { isCustom: true });
        }}
      />

      <div className={styles.submitBtnPlaceholder} />
      <Button
        type="submit"
        variant="primary"
        fullWidth
        className={styles.submitBtn}
      >
        Show results
      </Button>
    </form>
  );
};

type FeedFilterProps = {
  formik: Pick<
    ReturnType<typeof useFormik>,
    'handleReset' | 'handleSubmit' | 'setFieldValue'
  > & { values: FeedFiltersFormValues };
  formId?: string;
  vacancies?: React.ReactNode;
  specialties?: React.ReactNode;
  locations?: React.ReactNode;
};

export { WORK_RIGHTS } from './WorkRights';
export { EXPERIENCE } from './Experience';
export { default as TypicalList } from './TypicalList';
export type { ExperienceValue } from './Experience';

export default FeedFilters;
