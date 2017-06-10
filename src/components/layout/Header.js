import React from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';
import { fun, model, action } from '../../common';

function Header( { dispatch, user } ) {
  /**
   * 退出登录
   */
  const logout = () => {
    dispatch( { type: fun.fuse( model.app, action.logout ) } );
  }
  return (
    <div className={styles.normal}>
      <img src="/title.png" />
      <div className={styles.info}><span>hi~{user.doctorName}</span><br /><a onClick={logout}>退出登录</a></div>
    </div>
  );
};

function mapStateToProps( state ) {
  return {
    user: state.appModel.user,
  };
}

export default connect( mapStateToProps )( Header );
