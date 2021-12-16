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
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async () => {
      await onSuccess?.();
    },
  });

  const emailError =
    formik.errors.email && formik.touched.email
      ? formik.errors.email
      : undefined;
  const passwordError =
    formik.errors.password && formik.touched.password
      ? formik.errors.password
      : undefined;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className={styles.root}>
      <TextField
        name="email"
        type="email"
        label="Your email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        error={Boolean(emailError)}
        helperText={emailError}
        className={styles.mgBottom}
      />

      <TextField
        name="password"
        type={passwordVisible ? 'text' : 'password'}
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(passwordError)}
        helperText={passwordError}
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
        Sign in
      </Button>
    </form>
  );
};

type SignInFormProps = {
  onSuccess?: () => Promise<void> | void;
};

export default SignInForm;
