import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './Newborn.css';

function Newborn() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
      Route Component: Newborn
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Newborn);
