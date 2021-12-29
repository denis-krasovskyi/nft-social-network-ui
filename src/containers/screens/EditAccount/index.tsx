import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { Modal } from '@mui/material';
import { useToggle } from 'react-use';
import { useHistory } from 'react-router-dom';

import { Wallet } from 'api/types';
import { updateUserDataAction } from 'store/user/actionCreators';
import User from 'store/user';
import { setJWTTokenThunk } from 'store/auth';

import NearService from 'services/near';

import Button from 'components/ui-kit/Button';
import Typography from 'components/ui-kit/Typography';
import { useSnackbar } from 'components/ui-kit/Snackbar';
import AvatarUpload from 'components/AvatarUpload';

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

const validationSchema = object().shape({
  avatar: mixed().test('fileType', 'Unsupported format', (value) => {
    // null (no photo) can be as initial value, so it's valid
    if (value === null) return true;

    // get data type from base64
    const fileType = value.split(';')[0].split(':')[1];
    return SUPPORTED_FILE_TYPES.includes(fileType);
  }),
  username: string().required('This field is required'),
  socials: string(),
  bio: string(),
});

type User = {
  avatar: string | null;
  username: string;
  socials: string;
  bio: string;
  wallets: Wallet[];
};

const EditAccount: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [openWalletModal, setOpenWalletModal] = useToggle(false);
  const [initialData] = useState<User>({
    avatar: null,
    username: '',
    socials: '',
    bio: '',
    wallets: [
      {
        walletName: 'wallet.near',
        walletUrl: 'https://google.com',
        walletType: 'near',
        id: 1,
      },
    ],
  });

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
      avatar: initialData?.avatar,
      username: initialData?.username || '',
      socials: initialData?.socials || '',
      bio: initialData?.bio || '',
    },
    validationSchema,
    onSubmit: () => {
      dispatch(updateUserDataAction(values));

      history.push('/cabinet/account');
    },
  });

  const handlePopoverClose = () => {
    setOpenWalletModal(false);
  };

  const shouldSave = isValid && dirty;

  const handleAvatarChange = (img: string) => {
    setFieldValue('avatar', img, true);
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
          value={values.avatar || ''}
          onChange={handleAvatarChange}
          onError={handleAvatarUploadError}
          error={Boolean(errors.avatar)}
          fieldName="avatar"
        />

        {/*  <Button className={styles.addWallet} variant="outlined" fullWidth>
          Connect Wallet
        </Button> */}

        <Typography variant="label2">Wallet</Typography>

        {initialData.wallets.map((wallet) => (
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
