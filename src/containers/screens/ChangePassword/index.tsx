import React from 'react';
import { Link } from 'react-router-dom';

import ChangePasswordForm from 'containers/forms/ChangePassword';

import Typography from 'components/ui-kit/Typography';
import Logo from 'components/ui-kit/Logo';
import Button from 'components/ui-kit/Button';

import styles from './ChangePassword.module.scss';

const ChangePasswordScreen: React.FC = () => {
  return (
    <div className={styles.root}>
      <Logo className={styles.logo} />

      <div className={styles.formRoot}>
        <Typography variant="h2" align="center" className={styles.mgBottom}>
          Change your password
        </Typography>

        <ChangePasswordForm />
      </div>

      <Button
        variant="tertiary"
        fullWidth
        className={styles.alterLoginButton}
        component={Link}
        to="/sign-in"
      >
        Sign in by another way
      </Button>
    </div>
  );
};

export default ChangePasswordScreen;
