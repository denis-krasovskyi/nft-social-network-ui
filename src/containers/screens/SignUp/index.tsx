import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import SignUpForm from 'containers/forms/SignUp';

import Typography from 'components/ui-kit/Typography';
import Logo from 'components/ui-kit/Logo';
import Button from 'components/ui-kit/Button';

import { ReactComponent as FacebookIcon } from 'assets/icons/icon-Facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/icon-Google.svg';
import { ReactComponent as AppleIcon } from 'assets/icons/icon-Apple.svg';

import styles from './SignUp.module.scss';

const SignUpScreen: React.FC = () => {
  return (
    <div className={styles.root}>
      <Logo className={styles.logo} />

      <div className={styles.formRoot}>
        <Typography variant="h1" align="center" className={styles.mgBottom}>
          Join HackathonFE
        </Typography>

        <SignUpForm />
      </div>

      <div className={styles.separatorWrapper}>
        <hr className={styles.separatorLine} />

        <Typography
          variant="body2"
          align="center"
          className={styles.separatorText}
        >
          or sign up with
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
        Already have an account?{' '}
        <Link to="/sign-in">
          <Typography variant="button" className={styles.linkText}>
            Sign in
          </Typography>
        </Link>
      </Typography>

      <Typography variant="subtitle4" align="center" className={styles.terms}>
        Click “Sign Up” to agree to HackathonFE’s{' '}
        <Link to="/terms">
          <Typography variant="link2">Terms of Service</Typography>
        </Link>{' '}
        and
        <br /> acknowledge that HackathonFE’s{' '}
        <Link to="/privacy">
          <Typography variant="link2">Privacy Policy</Typography>
        </Link>{' '}
        applies to you.
      </Typography>
    </div>
  );
};

export default SignUpScreen;
