import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from 'containers/forms/ForgotPassword';

import Typography from 'components/ui-kit/Typography';
import Logo from 'components/ui-kit/Logo';
import Button from 'components/ui-kit/Button';

import styles from './ForgotPassword.module.scss';

const ForgotPasswordScreen: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className={styles.root}>
      <Logo className={styles.logo} />

      {isSubmitted ? (
        <>
          <div className={styles.results}>
            <Typography
              variant="h2"
              align="center"
              className={styles.resultsTitle}
            >
              Check your email!
            </Typography>

            <Typography
              variant="body2"
              align="center"
              className={styles.resultsText}
            >
              We’ve sent instructions to change your password to{' '}
              <i>email@email.com</i>
            </Typography>

            <Typography
              variant="caption"
              align="center"
              className={styles.resultsText}
            >
              If you don’t see the email, please check both your inbox and spam
              folder.
            </Typography>

            <Button
              variant="tertiary"
              fullWidth
              className={styles.openApp}
              component={Link}
              to="/sign-in"
            >
              Open email app
            </Button>

            <Button
              variant="ghost"
              fullWidth
              className={styles.resultsCancel}
              onClick={() => setIsSubmitted(false)}
            >
              Change email address
            </Button>
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
        </>
      ) : (
        <div className={styles.formRoot}>
          <Typography variant="h1" align="center" className={styles.mgBottom}>
            Forgot password?
          </Typography>

          <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />

          <Button
            variant="tertiary"
            fullWidth
            className={styles.cancel}
            component={Link}
            to="/sign-in"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordScreen;
