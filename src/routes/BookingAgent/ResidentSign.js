import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './ResidentSign.css';

function ResidentSign() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: ResidentSign
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ResidentSign);
