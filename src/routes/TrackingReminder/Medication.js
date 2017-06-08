import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './Medication.css';

function Medication() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: Medication
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Medication);
