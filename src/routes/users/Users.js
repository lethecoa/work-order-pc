import React from 'react';
import { connect } from 'dva';
import styles from './Users.less';
import UsersComponent from '../../components/users/Users';
import MainLayout from '../../components/layout/MainLayout';

//....
function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Users);