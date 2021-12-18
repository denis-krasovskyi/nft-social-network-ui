import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';

import api from 'api';

import { setJWTToken } from 'store/user/actionCreators';

import NearService, { NearSignature } from 'services/near';

import Typography from 'components/ui-kit/Typography';
import Button from 'components/ui-kit/Button';
import Spinner from 'components/Spinner';

import OnboardingLogo from 'assets/images/onboarding-logo.png';
import { ReactComponent as IconNear } from 'assets/icons/icon-near.svg';

import styles from './SignIn.module.scss';

const processSignatureRequest = (data: NearSignature) =>
  api.post('https://develop.nft-social-network.net/auth/near/login', {
    accountId: NearService.getUserAccountId(),
    publicKey: data.publicKey,
    signature: data.signature,
  });

const SignInScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useToggle(true);

  useEffect(() => {
    const tryToLogin = async () => {
      const token = localStorage.getItem('singularity-token');
      await NearService.init();

      if (token) {
        dispatch(setJWTToken(token));

        history.push('/cabinet/account');
      } else if (NearService.checkIsLoggedIn()) {
        const signature: NearSignature | null =
          await NearService.getSignature();

        if (signature) {
          const response = await processSignatureRequest(signature);
          localStorage.setItem('singularity-token', response.data);

          dispatch(setJWTToken(response.data));

          history.push('/cabinet/edit');
        }
      }
      setIsLoading(false);
    };

    tryToLogin();
  }, [dispatch, history, setIsLoading]);

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
