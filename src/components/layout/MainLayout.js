import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const moudleName = '主框架(MainLayout)';

function MainLayout( { dispatch, children, user } ) {
  fun.print( user, 'user', moudleName );
  return (
    <div className={styles.normal}>
      <Header user={user} dispatch={dispatch} />
      <div className={styles.content}>
        <Sidebar></Sidebar>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;