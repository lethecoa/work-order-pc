import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './ChildHealth.css';

function ChildHealth() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: ChildHealth
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ChildHealth);
