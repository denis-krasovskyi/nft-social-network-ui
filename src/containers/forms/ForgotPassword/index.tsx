import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from 'components/ui-kit/TextField';
import Button from 'components/ui-kit/Button';

import styles from './ForgotPassword.module.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
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

      <Button type="submit" variant="primary" fullWidth>
        Continue
      </Button>
    </form>
  );
};

type ForgotPasswordFormProps = {
  onSuccess?: () => Promise<void> | void;
};

export default ForgotPasswordForm;
