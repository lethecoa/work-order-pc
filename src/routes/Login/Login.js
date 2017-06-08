import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import MainLayout from '../../components/layout/MainLayout';

function Login() {
  return (
    <MainLayout>
      <div className={styles.normal}>
        Route Component: Login登录
    </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
