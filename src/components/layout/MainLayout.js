import React from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const { Content, Sider } = Layout;
const moudleName = '主框架(MainLayout)';

function MainLayout( { dispatch, children, user } ) {
  fun.print( user, 'user', moudleName );
  return (
    <div>
      <div className={ styles.header }>
        <Header user={ user } dispatch={ dispatch } /></div>
      <Layout style={ { marginTop: '82px' } }>
        <Sider className={ styles.sider } width={ 240 }>
          <Sidebar />
        </Sider>
        <Layout className={ styles.main }>
          <Content>
            { children }
          </Content>
        </Layout>
      </Layout>
    </div >
  );
}

export default MainLayout;