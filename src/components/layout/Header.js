import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Header.less';
import { fun, model, action } from '../../common';

const Header = ( { dispatch, user } ) => {
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

export default Header;
