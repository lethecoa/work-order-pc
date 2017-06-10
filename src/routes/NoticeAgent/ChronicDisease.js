import React from 'react';
import { connect } from 'dva';
import styles from './ChronicDisease.less';
import { MainLayout, ResidentInfoTable } from '../../components';
import { fun } from '../../common';

const moudle = '儿童健康随访通知(ChronicDisease)';

function ChronicDisease( { location, dispatch, user } ) {
  fun.print( user, 'user', moudle );
  return (
    <MainLayout location={location} user={user} dispatch={dispatch}>
      <div className={styles.normal}>
        <ResidentInfoTable />
      </div>
    </MainLayout>
  );
}

function mapStateToProps( state ) {
  return {
    user: state.appModel.user,
  };
}

export default connect( mapStateToProps )( ChronicDisease );
