import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Spinner from 'components/Spinner';
import { processSignatureRequest } from 'api/near';
import { ACCOUNT_ID_CALLBACK_LOGIN_PARAM_NAME } from 'utils';
import {
  setAccountTokenThunk,
  setJWTTokenThunk,
  authJWTTokenSelector,
  accountIdSelector,
} from 'store/auth';
import NearService from 'services/near';

import OnboardingLogo from 'assets/images/onboarding-logo.png';
import { ReactComponent as IconNear } from 'assets/icons/icon-near.svg';

import styles from './SignIn.module.scss';

const SignInScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(authJWTTokenSelector);
  const accountId = useSelector(accountIdSelector);

  const tryToLogin = async () => {
    await NearService.init();

    if (token) {
      history.push('/cabinet/account');
      return;
    }

    if (accountId) {
      const signature = await NearService.getSignature(accountId);

      if (!signature) return;

      const response = await processSignatureRequest({
        sign: signature,
        accId: accountId,
      });

      dispatch(setJWTTokenThunk(response.data));

      history.push('/cabinet/account');
    }
  };

  const { loading: isLoading } = useAsync(tryToLogin, [accountId]);

  useAsync(async () => {
    const executeCompleteSignIn = () => {
      const currentUrl = new URL(window.location.href);
      const accId = currentUrl.searchParams.get(
        ACCOUNT_ID_CALLBACK_LOGIN_PARAM_NAME,
      );

      if (accId) {
        window?.opener.completeSignIn?.(accId);
      }
    };

    if (!window.cordova) {
      executeCompleteSignIn();
    }
  }, []);

  const onLoginClick = async () => {
    const cbLink = window.cordova
      ? 'https://dev.app.astrodao.com/callback/auth'
      : window.location.href; // TODO replace it with own when possible
    const { loginUrl: loginLink, accessKey } = await NearService.intiLogin(
      cbLink,
    );

    if (!window.cordova) {
      const win = window.open(loginLink);

      window.completeSignIn = (accId: string) => {
        if (accId) {
          dispatch(setAccountTokenThunk(accId, accessKey));
        }
        win?.close();
      };

      return;
    }

    const inAppBrowserRef = window.cordova?.InAppBrowser.open(
      loginLink,
      '_blank',
      'location=yes,beforeload=yes',
    );

    inAppBrowserRef?.addEventListener('beforeload', async (e, load) => {
      if (e.url.startsWith(cbLink)) {
        const currentUrl = new URL(e.url);
        const accountIdResponse = currentUrl.searchParams.get(
          ACCOUNT_ID_CALLBACK_LOGIN_PARAM_NAME,
        );

        if (accountIdResponse) {
          dispatch(setAccountTokenThunk(accountIdResponse, accessKey));
        }

        inAppBrowserRef.close();
        return;
      }

      load(e.url);
    });
  };

  return (
    <div className={styles.root}>
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.formRoot}>
          <Typography variant="h1" align="center" className={styles.title}>
            Singularity
          </Typography>

          <Typography variant="h2" align="center" className={styles.subtitle}>
            Social interactions layer for NFTs
          </Typography>

          <img src={OnboardingLogo} alt="logo" className={styles.logo} />

          <Button
            variant="primary"
            onClick={onLoginClick}
            className={styles.signIn}
          >
            Sign up with
            <IconNear style={{ marginLeft: 9 }} />
          </Button>

          <div className={styles.row}>
            <Typography variant="caption1" className={styles.caption}>
              Terms and Conditions
            </Typography>

            <Typography variant="caption1" className={styles.caption}>
              Privacy Policy
            </Typography>
          </div>

          <Typography
            variant="caption1"
            align="center"
            className={styles.copyright}
          >
            © Singularity. All rights reserved.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default SignInScreen;
