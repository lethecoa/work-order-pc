import React from 'react';
import {Layout} from 'antd';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import {fun} from '../../common';

const { Content, Sider } = Layout;
const moudleName = '主框架(MainLayout)';

function MainLayout( { dispatch, children, user, pathname } ) {
	fun.print( user, 'user', moudleName );
	return (
		<Layout>
			<div className={ styles.header }>
				<Header user={ user } dispatch={ dispatch } userType={user.userType}/></div>
			<Layout style={ { margin: '110px 20px 20px' } }>
				<Sider width={ 240 }>
					<Sidebar pathname={ pathname ? '/' + pathname : '/' } userType={user.userType}/>
				</Sider>
				<Layout className={ styles.main }>
					<Content>
						{ children }
					</Content>
				</Layout>
			</Layout>
			<div className={ styles.footer }>
				技术支持：易联众信息技术股份有限公司 © 1997-2017&nbsp;&nbsp;&nbsp;&nbsp;
				合作邮箱：yangruiping@21cn.com
			</div>
		</Layout>
	);
}

export default MainLayout;