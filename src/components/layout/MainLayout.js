import React from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const { Content } = Layout;
const moudleName = '主框架(MainLayout)';

function MainLayout( { dispatch, children, user } ) {
  fun.print( user, 'user', moudleName );
  return (
    <Layout className={styles.normal}>
      <Header user={user} dispatch={dispatch} />
      <Layout>
        <div className={styles.content}>
          <Sidebar></Sidebar>
          <Content className={styles.main}>
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}

export default MainLayout;