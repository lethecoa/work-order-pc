import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './Hypertension.css';

function Hypertension() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: Hypertension
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Hypertension);
