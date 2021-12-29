import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { processSignatureRequest } from 'api/near';
import { setJWTTokenThunk, authJWTTokenSelector } from 'store/auth';
import { TOKEN_STORAGE_KEY } from 'utils';
import NearService from 'services/near';
import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Spinner from 'components/Spinner';

import OnboardingLogo from 'assets/images/onboarding-logo.png';
import { ReactComponent as IconNear } from 'assets/icons/icon-near.svg';

import styles from './SignIn.module.scss';

const SignInScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(authJWTTokenSelector);

  const tryToLogin = async () => {
    await NearService.init();

    if (token) {
      history.push('/cabinet/account');
      return;
    }

    if (NearService.checkIsLoggedIn()) {
      const signature = await NearService.getSignature();

      if (!signature) return;

      const response = await processSignatureRequest({
        sign: signature,
        accId: NearService.getUserAccountId(),
      });
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data);

      dispatch(setJWTTokenThunk(response.data));

      history.push('/cabinet/edit');
    }
  };

  const { loading: isLoading } = useAsync(tryToLogin, []);

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
            onClick={() => NearService.login(history)}
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
