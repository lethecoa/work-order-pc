import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './NewestActivity.css';

function NewestActivity() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: NewestActivity
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(NewestActivity);
