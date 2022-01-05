import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { Modal } from '@mui/material';
import { useToggle } from 'react-use';
import { useHistory } from 'react-router-dom';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import { useSnackbar } from 'components/ui-kit/Snackbar';
import AvatarUpload from 'components/AvatarUpload';
import NearService from 'services/near';
import { Wallet } from 'api/types';
import { updateUserData as updateUserDataRequest } from 'api/users';
import { updateUserData, userSelector } from 'store/user';
import { setJWTTokenThunk } from 'store/auth';

import { ReactComponent as IconCheck } from 'assets/icons/icon-check.svg';
import { ReactComponent as IconCheckActive } from 'assets/icons/icon-check-active.svg';
import { ReactComponent as IconArrowLeft } from 'assets/icons/icon-arrow-left.svg';
import { ReactComponent as IconRemove } from 'assets/icons/icon-remove.svg';
import { ReactComponent as IconWalletNear } from 'assets/icons/icon-wallet-near.svg';
import { ReactComponent as IconCross } from 'assets/icons/icon-cross.svg';

import styles from './EditAccount.module.scss';

const BIO_FIELD_MAX_LENGTH = 130;
const SUPPORTED_FILE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];

type AvatarFieldValue = {
  preview?: string;
  file?: File | null;
};

const validationSchema = object().shape({
  avatar: mixed().test(
    'fileType',
    'Unsupported format',
    (value: AvatarFieldValue) => {
      if (value.file?.type) {
        return SUPPORTED_FILE_TYPES.includes(value.file.type);
      }

      return true;
    },
  ),
  username: string().required('This field is required'),
  socials: string(),
  bio: string(),
});

const EditAccount: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector(userSelector);

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [openWalletModal, setOpenWalletModal] = useToggle(false);

  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    errors,
    values,
    isValid,
    dirty,
    handleChange,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      avatar: {
        preview: user.avatar,
        file: null as File | null,
      },
      username: user?.username || '',
      socials: user?.socials || '',
      bio: user?.bio || '',
    },
    validationSchema,
    onSubmit: async (submitValues) => {
      const payload = {
        username: submitValues.username,
        bio: submitValues.bio,
        instagram: submitValues.socials,
        profilePicture: await submitValues.avatar.file?.text(),
      };

      await updateUserDataRequest({ ...payload, profilePicture: undefined });

      dispatch(updateUserData(payload));

      history.push('/cabinet/account');
    },
  });

  const handlePopoverClose = () => {
    setOpenWalletModal(false);
  };

  const shouldSave = isValid && dirty;

  const handleAvatarChange = (img: File) => {
    setFieldValue(
      'avatar',
      { file: img, preview: URL.createObjectURL(img) },
      true,
    );
  };

  const handleAvatarUploadError = () => {
    enqueueSnackbar(errors.avatar, { variant: 'error' });
    setFieldValue('avatar', null, true);
  };

  const handleBioFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFieldValue('bio', value.slice(0, BIO_FIELD_MAX_LENGTH));
  };

  const handleOnSubmitClick = () => {
    if (shouldSave) {
      handleSubmit();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Button
          className={styles.headerButton}
          variant="ghost"
          onClick={() => history.goBack()}
        >
          <IconArrowLeft />
        </Button>

        <Typography variant="title6">Settings</Typography>

        <Button
          className={styles.headerButton}
          variant="ghost"
          onClick={handleOnSubmitClick}
        >
          {shouldSave ? <IconCheckActive /> : <IconCheck />}
        </Button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <AvatarUpload
          preview={values.avatar.preview}
          onChange={handleAvatarChange}
          onError={handleAvatarUploadError}
          error={Boolean(errors.avatar)}
          fieldName="avatar"
          accept={SUPPORTED_FILE_TYPES.toString()}
        />

        {/*  <Button className={styles.addWallet} variant="outlined" fullWidth>
          Connect Wallet
        </Button> */}

        <Typography variant="label2">Wallet</Typography>

        {user.wallets?.map((wallet) => (
          <div className={styles.walletWrapper} key={wallet.id}>
            <IconWalletNear />

            <button
              type="button"
              className={styles.walletRow}
              onClick={() => {
                setSelectedWallet(wallet);
                setOpenWalletModal(true);
              }}
            >
              <Typography variant="body3">{wallet.walletName}</Typography>

              <IconRemove />
            </button>
          </div>
        ))}

        <Typography variant="label2" component="p" className={styles.infoLabel}>
          Username
        </Typography>

        <input
          name="username"
          className={styles.infoField}
          placeholder="User_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />

        <Typography variant="label2" component="p" className={styles.infoLabel}>
          Instagram
        </Typography>

        <input
          name="socials"
          className={styles.infoField}
          placeholder="@user_name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.socials}
        />

        <Typography variant="label2" component="p" className={styles.infoLabel}>
          Bio
        </Typography>

        <textarea
          name="bio"
          className={styles.infoField}
          placeholder="Lorem ipsum dolore est some text is here can be various awesome stuff about you here and here as well"
          onChange={handleBioFieldChange}
          onBlur={handleBlur}
          value={values.bio}
        />

        <div className={styles.separator} />

        <Typography variant="tagline2" component="p" className={styles.tagline}>
          Account
        </Typography>

        <Button
          variant="ghostError"
          className={styles.logout}
          onClick={() => {
            NearService.logOut();
            dispatch(setJWTTokenThunk(null));
          }}
        >
          Log out
        </Button>

        <Modal open={openWalletModal} onClose={handlePopoverClose}>
          <div className={styles.modalContentWrapper}>
            <div className={styles.modalContent}>
              <Button
                variant="ghost"
                className={styles.modalButtonClose}
                onClick={() => setOpenWalletModal(false)}
              >
                <IconCross />
              </Button>

              <Typography variant="title7">Disconnect Wallet</Typography>

              <Typography variant="body3" className={styles.modalText}>
                Are you sure you want to disconnect this wallet? NFTs from this
                wallet will be disabled until next wallet reconnection.
              </Typography>

              <div className={styles.modalWallet}>
                <IconWalletNear />
                <Typography variant="body2" className={styles.modalWalletName}>
                  {selectedWallet?.walletName}
                </Typography>
              </div>

              <div className={styles.modalFooter}>
                <Button
                  className={styles.modalButton}
                  variant="ghost"
                  onClick={() => setOpenWalletModal(false)}
                >
                  Cancel
                </Button>

                <Button
                  className={styles.modalButton}
                  variant="tertiaryError"
                  onClick={() => setOpenWalletModal(false)}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default EditAccount;
