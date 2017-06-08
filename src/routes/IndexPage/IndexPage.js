import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import MainLayout from '../../components/layout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>React,你敢不敢再难一点！？</h1>
        <div className={styles.welcome} />
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);