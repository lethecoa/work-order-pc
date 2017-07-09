import React from 'react';
import { Menu, Icon, Popover } from 'antd';
import styles from './Header.less';
import { fun, model, action, urlMap, config } from '../../common';

const Header = ( { dispatch, user } ) => {
  const recharge = () => {
    fun.showNotification( '充值演示', '替换我吧！' );
  }
  const updateLog = (
    <div>
      <p># 修复了多行编辑bug，现改进为：点击编辑一行后，隐藏其它行的编辑选项</p>
      <p># 修复了页面切换的时候居民信息表的表头会出现异常的情况，此问题引起了多处bug</p>
      <p>&nbsp;</p>
      <p>$ 增加了通知情况不允许留空的设定</p>
      <p>$ 增加了顶部版本号鼠标悬停显示更新日志的功能</p>
      <p>$ 增加了顶部用户名处鼠标悬停显示用户信息的功能，目前比较简陋</p>
    </div> );
  const userInfo = (
    <div>
      <p>当前账户余额：3000</p>
      <a onClick={ recharge }>朕要充值</a>
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
          <Popover content={ updateLog } title="更新日志" placement="bottomRight">
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
