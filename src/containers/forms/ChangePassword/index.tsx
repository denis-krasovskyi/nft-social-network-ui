import React from 'react';
import { useFormik } from 'formik';
import { useToggle } from 'react-use';
import * as Yup from 'yup';

import TextField from 'components/ui-kit/TextField';
import Button from 'components/ui-kit/Button';
import IconButton from 'components/ui-kit/IconButton';

import { ReactComponent as EyeIcon } from 'assets/icons/icon-eye.svg';
import { ReactComponent as EyeCrossedIcon } from 'assets/icons/icon-eye-off.svg';

import styles from './SignIn.module.scss';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
      'Must contain One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSuccess,
}) => {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async () => {
      await onSuccess?.();
    },
  });

  const passwordError =
    formik.errors.password && formik.touched.password
      ? formik.errors.password
      : undefined;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className={styles.root}>
      <TextField
        name="password"
        type={passwordVisible ? 'text' : 'password'}
        label="Create a new password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(passwordError)}
        helperText={passwordError || 'Use UPPER letters, symbols and numbers'}
        InputProps={{
          endAdornment: (
            <IconButton onClick={togglePasswordVisible}>
              {passwordVisible ? <EyeIcon /> : <EyeCrossedIcon />}
            </IconButton>
          ),
        }}
        fullWidth
        className={styles.mgBottomLg}
      />

      <Button type="submit" variant="primary" fullWidth>
        Change password
      </Button>
    </form>
  );
};

type ChangePasswordFormProps = {
  onSuccess?: () => Promise<void> | void;
};

export default ChangePasswordForm;
