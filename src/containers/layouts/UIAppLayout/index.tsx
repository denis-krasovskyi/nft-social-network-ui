import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import NearService from 'services/near';
import NavBar from 'components/NavBar';
import { authJWTTokenSelector } from 'store/auth';

import { useAuth } from './useAuth';

import styles from './UIAppLayout.module.scss';

const UIAppLayout: React.FC = ({ children }) => {
  const token = useSelector(authJWTTokenSelector);
  const isAuthorized = Boolean(token);

  const { authorize } = useAuth();

  useAsync(authorize, [isAuthorized]);

  useEffect(() => {
    NearService.init();
  }, []);

  return (
    <div className={styles.root}>
      {children}

      <div className={styles.footer}>
        <NavBar />
      </div>
    </div>
  );
};

export default UIAppLayout;
