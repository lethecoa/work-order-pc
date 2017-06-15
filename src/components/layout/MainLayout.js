import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const moudleName = '主框架(MainLayout)';

class MainLayout extends React.Component {
  render() {
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
  componentDidMount() {
    console.log( 'componentDidMount' );
  }
}

export default MainLayout;