import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MainLayout from '../../components/layout/MainLayout';

function IndexPage( { user } ) {
  console.log( user );
  return (
    <MainLayout user={user}>
      <div className={styles.normal}>
        <h1 className={styles.title}>React,你敢不敢再难一点！？</h1>
        <div className={styles.welcome} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps( state ) {
  return {
    user: state.appModel.user,
  };
}

export default connect( mapStateToProps )( IndexPage );