import React from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const { Content, Sider } = Layout;
const moudleName = '主框架(MainLayout)';

function MainLayout( { dispatch, children, user, pathname } ) {
  fun.print( user, 'user', moudleName );
  return (
    <Layout>
      <div className={ styles.header }>
        <Header user={ user } dispatch={ dispatch } /></div>
      <Layout style={ { margin: '110px 20px 20px' } }>
        <Sider width={ 240 }>
          <Sidebar pathname={ pathname ? pathname : '/' } />
        </Sider>
        <Layout className={ styles.main }>
          <Content>
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;