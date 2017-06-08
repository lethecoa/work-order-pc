import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './SignFamily.css';

function SignFamily({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: SignFamily
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SignFamily);
