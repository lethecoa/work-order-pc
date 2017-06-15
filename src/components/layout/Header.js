import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Header.less';
import { fun, model, action, urlMap, config } from '../../common';

const Header = ( { dispatch, user } ) => {
  /**
   * 退出登录
   */
  const logout = () => {
    dispatch( { type: fun.fuse( model.app, action.logout ) } );
  }
  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <span>hi~ {user.doctorName}</span><br />
        <div className={styles.btnBg}>
          <span>ver{config.ver}</span>&nbsp;&nbsp;&nbsp;
          <a href={urlMap.index}>首页</a>&nbsp;&nbsp;<a onClick={logout}>退出登录</a>&nbsp;
        </div>
      </div>
    </div>
  );
};

export default Header;
