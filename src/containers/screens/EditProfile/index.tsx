import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string, mixed } from 'yup';
import classNames from 'classnames';

import Typography from 'components/ui-kit/Typography';
import ScreenHeader from 'components/ScreenHeader';
import Button from 'components/ui-kit/Button';
import TextField from 'components/ui-kit/TextField';
import AvatarUpload from 'components/AvatarUpload';
import LocationField from 'components/LocationField';
import { useSnackbar } from 'components/ui-kit/Snackbar';

import { ReactComponent as LinkIcon } from 'assets/icons/icon-link.svg';

import styles from './EditProfile.module.scss';

const ORGANIZATION_FIELD_MAX_LENGTH = 100;
const OVERVIEW_FIELD_MAX_LENGTH = 150;
const SUPPORTED_FILE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];

const validationSchema = object().shape({
  avatar: mixed().test('fileType', 'Unsupported format', (value) => {
    // null (no photo) can be as initial value, so it's valid
    if (value === null) return true;

    // get data type from base64
    const fileType = value.split(';')[0].split(':')[1];
    return SUPPORTED_FILE_TYPES.includes(fileType);
  }),
  organization: string().required('This field is required'),
  location: string().required('This field is required'),
  videoPresentation: string().required('This field is required'),
  overview: string().required('This field is required'),
});

const EditProfile: FC = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    errors,
    values,
    isValid,
    dirty,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      avatar: null,
      organization: 'Organization test',
      location: 'City test',
      videoPresentation:
        'https://res.cloudinary.com/de83qdofi/video/upload/v1637742525/sample-mp4-file_topwjj.mp4#t=0.01',
      overview: 'The best',
    },
    validationSchema,
    onSubmit: () => null,
  });
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const shouldSave = isValid && dirty;

  const handleResetClick = () => {
    resetForm();
  };

  const handleAvatarChange = (img: string) => {
    setFieldValue('avatar', img, true);
  };

  const handleAvatarUploadError = useCallback(() => {
    enqueueSnackbar(errors.avatar, { variant: 'error' });
    setFieldValue('avatar', null, true);
  }, [errors.avatar, setFieldValue, enqueueSnackbar]);

  const handleLocationChange = (value: string) => {
    setFieldValue('location', value, true);
  };

  const handleOrganizationFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFieldValue(
        'organization',
        value.slice(0, ORGANIZATION_FIELD_MAX_LENGTH),
      );
    },
    [setFieldValue],
  );

  const handleOverviewFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFieldValue('overview', value.slice(0, OVERVIEW_FIELD_MAX_LENGTH));
    },
    [setFieldValue],
  );

  return (
    <>
      <ScreenHeader
        title="Edit profile"
        onBackButtonClick={() => history.goBack()}
        right={
          shouldSave && (
            <Button className={styles.resetBtn} onClick={handleResetClick}>
              Reset
            </Button>
          )
        }
      />
      <form className={styles.root} onSubmit={handleSubmit}>
        <AvatarUpload
          value={values.avatar}
          onChange={handleAvatarChange}
          onError={handleAvatarUploadError}
          error={Boolean(errors.avatar)}
          fieldName="avatar"
        />
        <TextField
          name="organization"
          className={styles.infoField}
          label="Organization name"
          onChange={handleOrganizationFieldChange}
          onBlur={handleBlur}
          error={Boolean(errors.organization)}
          value={values.organization}
          FormHelperTextProps={{
            className: classNames(styles.helperText, styles.textAlignRight),
          }}
          helperText={
            <Typography
              variant="subtitle4"
              component="span"
              className={styles.colorGrey}
            >
              {values.organization.length}/{ORGANIZATION_FIELD_MAX_LENGTH}
            </Typography>
          }
        />
        <LocationField
          value={values.location}
          onChange={handleLocationChange}
          error={Boolean(errors.location)}
        />
        <TextField
          name="videoPresentation"
          className={styles.infoField}
          label="Video presentation"
          InputProps={{ startAdornment: <LinkIcon /> }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.videoPresentation)}
          value={values.videoPresentation}
          FormHelperTextProps={{
            className: classNames(styles.helperText),
          }}
          helperText={
            <Typography
              variant="subtitle4"
              component="span"
              className={styles.colorGrey}
            >
              Video URL starts with https://...
            </Typography>
          }
        />
        <TextField
          name="overview"
          className={styles.infoField}
          label="Overview"
          multiline
          rows={4}
          onChange={handleOverviewFieldChange}
          onBlur={handleBlur}
          error={Boolean(errors.overview)}
          value={values.overview}
          FormHelperTextProps={{
            className: classNames(styles.helperText, styles.textAlignRight),
          }}
          helperText={
            <Typography
              variant="subtitle4"
              component="span"
              className={styles.colorGrey}
            >
              {values.overview.length}/{OVERVIEW_FIELD_MAX_LENGTH}
            </Typography>
          }
        />
        {shouldSave && (
          <Button
            className={styles.saveBtn}
            variant="primary"
            size="large"
            type="submit"
          >
            Save
          </Button>
        )}
      </form>
    </>
  );
};

export default EditProfile;
