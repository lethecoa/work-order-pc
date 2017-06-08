import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './ChronicDisease.css';

function ChronicDisease() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: ChronicDisease
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ChronicDisease);
