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
    <Layout style={ { height: '100%' } }>
      <div className={ styles.header }>
        <Header user={ user } dispatch={ dispatch } /></div>
      <Layout style={ { marginTop: 90 } }>
        <div className={ styles.sider }>
          <Sider width={ 240 }>
            <Sidebar />
          </Sider>
        </div>
        <Layout className={ styles.main } style={ { marginLeft: 240 } }>
          <Content>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;