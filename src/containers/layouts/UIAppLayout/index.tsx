import React, { useEffect } from 'react';
import { useAsync } from 'react-use';

import NearService from 'services/near';

import NavBar from 'components/NavBar';

import { useAuth } from './useAuth';

import styles from './UIAppLayout.module.scss';

const UIAppLayout: React.FC = () => {
  const { authorize } = useAuth();

  useAsync(authorize, []);

  useEffect(() => {
    NearService.init();
  }, []);

  return (
    <div className={styles.root}>
      {/* {children} */}

      <div className={styles.footer}>
        <NavBar />
      </div>
    </div>
  );
};

export default UIAppLayout;
