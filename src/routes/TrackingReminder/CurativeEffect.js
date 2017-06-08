import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './CurativeEffect.css';

function CurativeEffect() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: CurativeEffect
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CurativeEffect);
