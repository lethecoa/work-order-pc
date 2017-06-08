import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './Diabetes.css';

function Diabetes() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: Diabetes
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Diabetes);
