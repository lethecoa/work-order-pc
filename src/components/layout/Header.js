import React from 'react';
import { Menu, Icon, Popover } from 'antd';
import styles from './Header.less';
import { fun, model, action, urlMap, config, updateLog } from '../../common';

const Header = ( { dispatch, user } ) => {
  const recharge = () => {
    fun.showNotification( '充值演示', '替换我吧！' );
  }
  const userInfo = (
    <div>
      <p>当前账户余额：3000</p>
      <a onClick={ recharge }>我要充值</a>
    </div>
  );
  /**
   * 退出登录
   */
  const logout = () => {
    dispatch( { type: fun.fuse( model.app, action.logout ) } );
  }

  return (
    <div className={ styles.normal }>
      <div className={ styles.info }>
        <Popover content={ userInfo } title="用户信息" placement="leftTop">
          <span className={ styles.hand }>hi~ { user.doctorName }</span>
        </Popover>
        <br />
        <div className={ styles.btnBg }>
          <Popover content={ updateLog.getLog( config.ver ) } title={ '更新日志 (' + config.ver + ')' } placement="bottomRight">
            <span className={ styles.hand }>ver{ config.ver }</span>
          </Popover>
          &nbsp;&nbsp;&nbsp;
          <a href={ urlMap.index }>首页</a>&nbsp;&nbsp;<a onClick={ logout }>退出登录</a>&nbsp;
        </div>
      </div>
    </div>
  );
};

export default Header;
