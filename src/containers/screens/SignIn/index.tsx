import React from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';

import SignInForm from 'containers/forms/SignIn';

import Typography from 'components/ui-kit/Typography';
import Logo from 'components/ui-kit/Logo';
import Button from 'components/ui-kit/Button';

import { ReactComponent as FacebookIcon } from 'assets/icons/icon-Facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/icon-Google.svg';
import { ReactComponent as AppleIcon } from 'assets/icons/icon-Apple.svg';

import styles from './SignIn.module.scss';

const SignInScreen: React.FC = () => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <Logo className={styles.logo} />

      <div className={styles.formRoot}>
        <Typography variant="h1" align="center" className={styles.mgBottom}>
          Welcome back
        </Typography>

        <SignInForm onSuccess={() => history.push('/cabinet/managers-feed')} />

        <Typography variant="body2" align="center" className={styles.link}>
          Forgot your password?{' '}
          <Link to="/forgot-password">
            <Typography variant="button" className={styles.linkText}>
              Get help signing in
            </Typography>
          </Link>
        </Typography>
      </div>

      <div className={styles.width}>
        <div className={styles.separatorWrapper}>
          <hr className={styles.separatorLine} />

          <Typography
            variant="body2"
            align="center"
            className={styles.separatorText}
          >
            or sign in with
          </Typography>

          <hr className={styles.separatorLine} />
        </div>

        <div className={styles.alterLogin}>
          <Button variant="tertiary" className={styles.alterLoginButton}>
            <GoogleIcon />
          </Button>

          <Button
            variant="tertiary"
            className={classNames(styles.alterLoginButton, styles.appleButton)}
          >
            <AppleIcon />
          </Button>

          <Button variant="tertiary" className={styles.alterLoginButton}>
            <FacebookIcon />
          </Button>
        </div>

        <Typography variant="body2" align="center" className={styles.link}>
          Don’t have an account?{' '}
          <Link to="/sign-up">
            <Typography variant="button" className={styles.linkText}>
              Sign up
            </Typography>
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignInScreen;
