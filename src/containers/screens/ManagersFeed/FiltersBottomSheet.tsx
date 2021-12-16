import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { useToggle } from 'react-use';

import { BottomSheet } from 'components/ui-kit/ModalSheet';
import Divider from 'components/ui-kit/Divider';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import ScreenHeader from 'components/ScreenHeader';
import SearchByText, { SearchItem } from 'containers/forms/SearchByText';
import FeedFilters, {
  WORK_RIGHTS,
  WORK_STATUS,
  FeedFiltersFormValues,
  TypicalList,
} from 'containers/forms/FeedFilters';

import styles from './FiltersBottomSheet.module.scss';

enum CUSTOM_FORM_TYPES {
  vacancies = 'vacancies',
  specialities = 'specialities',
  locations = 'locations',
}

const MAIN_FILTERS_FORM_ID = 'MAIN_FILTERS_FORM_ID';

const FiltersBottomSheet: React.FC<FiltersBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const formik = useFormik<
    FeedFiltersFormValues & Record<CUSTOM_FORM_TYPES, SearchItem[]>
  >({
    initialValues: {
      status: WORK_STATUS.allStatuses,
      workRights: [WORK_RIGHTS.all],
      experience: [],
      [CUSTOM_FORM_TYPES.vacancies]: [],
      [CUSTOM_FORM_TYPES.specialities]: [],
      [CUSTOM_FORM_TYPES.locations]: [],
    },
    onSubmit: () => null,
  });

  const [additionalFormType, setAdditionalFormType] =
    useState<CUSTOM_FORM_TYPES>(undefined);

  const [fullscreenEnabled, toggleFullscreenEnabled] = useToggle(false);

  useEffect(() => {
    if (!isOpen && additionalFormType) {
      setAdditionalFormType(undefined);
    }
  }, [isOpen, additionalFormType]);

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => {
        if (fullscreenEnabled) return window.innerHeight;
        if (additionalFormType) return minHeight;
        return [minHeight, 650];
      }}
      initialFocusRef={false}
      expandOnContentDrag={false}
      className={classNames(styles.bottomSheetOverrides, {
        [styles.bottomSheetFullScreenOverrides]: fullscreenEnabled,
      })}
      header={
        <>
          {!additionalFormType && (
            <div className={styles.head}>
              <Typography variant="title1">Filter by</Typography>

              <Button onClick={formik.handleReset}>
                <Typography
                  variant="button"
                  component="span"
                  className={styles.resetBtnText}
                >
                  Clear filters
                </Typography>
              </Button>
            </div>
          )}

          {additionalFormType && (
            <ScreenHeader
              onBackButtonClick={() => {
                if (fullscreenEnabled) {
                  toggleFullscreenEnabled(false);
                  return;
                }
                setAdditionalFormType(undefined);
              }}
              title={
                (additionalFormType === CUSTOM_FORM_TYPES.vacancies &&
                  'Vacancy') ||
                (additionalFormType === CUSTOM_FORM_TYPES.specialities &&
                  'Specialties') ||
                'Location'
              }
              right={
                !fullscreenEnabled && (
                  <Button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector<HTMLButtonElement>(
                          `button#${additionalFormType}`,
                        )
                        ?.click();
                    }}
                  >
                    <Typography
                      variant="button"
                      component="span"
                      className={styles.resetBtnText}
                    >
                      Reset
                    </Typography>
                  </Button>
                )
              }
              className={styles.mgBottomXs}
            />
          )}
        </>
      }
    >
      {!additionalFormType && (
        <>
          <Divider className={classNames(styles.divider, styles.mgBottom)} />
          <FeedFilters
            formik={formik}
            vacancies={
              <TypicalList
                title="vacancy"
                list={formik.values[CUSTOM_FORM_TYPES.vacancies]}
                onClick={() => {
                  setAdditionalFormType(CUSTOM_FORM_TYPES.vacancies);
                }}
                onCloseClick={() =>
                  formik.setFieldValue(CUSTOM_FORM_TYPES.vacancies, [])
                }
              />
            }
            specialties={
              <TypicalList
                title="specialties"
                list={formik.values[CUSTOM_FORM_TYPES.specialities]}
                onClick={() => {
                  setAdditionalFormType(CUSTOM_FORM_TYPES.specialities);
                }}
                onCloseClick={() =>
                  formik.setFieldValue(CUSTOM_FORM_TYPES.specialities, [])
                }
              />
            }
            locations={
              <TypicalList
                title="location"
                list={formik.values[CUSTOM_FORM_TYPES.locations]}
                onClick={() => {
                  setAdditionalFormType(CUSTOM_FORM_TYPES.locations);
                }}
                onCloseClick={() =>
                  formik.setFieldValue(CUSTOM_FORM_TYPES.locations, [])
                }
              />
            }
            formId={MAIN_FILTERS_FORM_ID}
          />
        </>
      )}

      {additionalFormType === CUSTOM_FORM_TYPES.vacancies && (
        <SearchByText
          title="vacancy"
          onSave={(selectedOptions) => {
            formik.setFieldValue(additionalFormType, selectedOptions);
            setAdditionalFormType(undefined);
          }}
          initialSelectedOptions={formik.values[additionalFormType]}
          options={[
            { label: 'Chef', id: 'Chef' },
            { label: 'Sous chef', id: 'Sous chef' },
            { label: 'Pastry chef', id: 'Pastry chef' },
            { label: 'Sommelier', id: 'Sommelier' },
          ]}
          recommendationsList={[
            { label: 'Chef', id: 'Chef' },
            { label: 'Sous chef', id: 'Sous chef' },
          ]}
          autocompleteEnabled={fullscreenEnabled}
          onSearchFocus={() => {
            if (!fullscreenEnabled) {
              toggleFullscreenEnabled(true);
            }
          }}
          resetSelectedBtnId={additionalFormType}
        />
      )}
    </BottomSheet>
  );
};

type FiltersBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default FiltersBottomSheet;
