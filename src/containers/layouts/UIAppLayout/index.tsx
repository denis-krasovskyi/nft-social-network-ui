import React, { useEffect } from 'react';

import NearService from 'services/near';
import NavBar from 'components/NavBar';

import { useAuth } from './useAuth';

import styles from './UIAppLayout.module.scss';

const UIAppLayout: React.FC = ({ children }) => {
  useAuth();

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
