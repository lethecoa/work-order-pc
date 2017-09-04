import React from 'react';
import {Menu, Icon, Popover} from 'antd';
import styles from './Header.less';
import {fun, model, action, config, updateLog, modular} from '../../common';

const Header = ( { dispatch, user, userType } ) => {
	const username = userType === config.userType.doctor ? user.doctorName : user.name;
	const portrait = userType === config.userType.doctor ? require( '../../assets/doctor1.png' ) : require( '../../assets/worker1.png' );
	const homeUrl = userType === config.userType.doctor ? modular.index.url : modular.unfinished.url;

	const recharge = () => {
		fun.showNotification( '充值演示', '替换我吧！' );
	};
	const userInfo = (
		<div>
			<p>当前账户余额：3000</p>
			<a onClick={recharge}>我要充值</a>
		</div>
	);
	/**
	 * 退出登录
	 */
	const logout = () => {
		dispatch( { type: fun.fuse( model.app, action.logout ) } );
	};

	return (
		<div className={styles.normal}>
			<div className={styles.info}>
				<span className={styles.name}>hi~ {username}</span>
				<br/>
				<div className={styles.btnBg}>
					<Popover content={updateLog.getLog( config.ver )} title={'更新日志 (' + config.ver + ')'} placement="bottomRight">
						<span className={styles.ver}>ver{config.ver}</span>
					</Popover>
					&nbsp;&nbsp;&nbsp;<a href={homeUrl}>首页</a>&nbsp;&nbsp;<a onClick={logout}>退出登录</a>&nbsp;
				</div>
				<Popover content={userInfo} title="用户信息" placement="bottomRight">
					<div className={styles.avatar}>
						<img src={portrait}/>
					</div>
				</Popover>
			</div>
		</div>
	);
};

export default Header;
