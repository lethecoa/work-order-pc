import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'

function MainLayout( { children, user } ) {
  return (
    <div className={styles.normal}>
      <Header user={user} />
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