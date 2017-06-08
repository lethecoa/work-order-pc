import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './Postpartum.css';

function Postpartum() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: Postpartum
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Postpartum);
