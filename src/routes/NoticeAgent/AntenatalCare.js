import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/layout/MainLayout';
import styles from './AntenatalCare.css';

function AntenatalCare() {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Route Component: AntenatalCare
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AntenatalCare);
