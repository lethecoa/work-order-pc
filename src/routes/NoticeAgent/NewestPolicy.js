import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './NewestPolicy.css';

function NewestPolicy() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: NewestPolicy
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(NewestPolicy);
