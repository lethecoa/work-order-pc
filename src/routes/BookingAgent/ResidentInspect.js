import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './ResidentInspect.css';

function ResidentInspect() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
      Route Component: ResidentInspect
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ResidentInspect);
