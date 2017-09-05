import { browserHistory } from "dva/router";
import styles from './Sidebar.less';
import { Menu } from 'antd';
import { modular, config } from '../../common';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Sidebar( { pathname, user } ) {
	const { userType } = user;
	const onSelect = ( obj ) => {
		if ( obj.key !== '' && obj.key.indexOf( 'jump' ) < 0 ) {
			browserHistory.push( obj.key );
		}
	};

	return (
		<div className={ styles.menu }>
			{ userType === config.userType.doctor ?
				<Menu
					defaultSelectedKeys={ [ pathname ] }
					defaultOpenKeys={ [ '0', '1', '2' ] }
					mode="inline"
					theme="dark"
					onClick={ onSelect }
				>
					<Menu.Item key={ modular.index.url }>
						<span className={ styles.menuItem }>
							<i className={ styles.wof1 + ' ' + styles[ 'woc-shouye' ] } />
							<span className={ styles.m1 }>{ modular.index.cn }</span></span>
					</Menu.Item>
					<SubMenu key="0" title={ <span className={ styles.menuItem }>
						<i className={ styles.wof1 + ' ' + styles[ 'woc-yyz' ] } />
						<span className={ styles.m1 }>云医助</span></span> }>
						<MenuItemGroup key="bookingAgentMenu" title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-yuyue' ] } />
							<span className={ styles.m2 }>预约代理</span></span> }>
							<Menu.Item key={ modular.residentSign.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-jiatingyisheng' ] } />
									<span className={ styles.m3 }>{ modular.residentSign.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.residentInspect.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-tijian' ] } />
									<span className={ styles.m3 }>{ modular.residentInspect.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.newborn.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-xset' ] } />
									<span className={ styles.m3 }>{ modular.newborn.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.postpartum.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-chanhoutiantijian' ] } />
									<span className={ styles.m3 }>{ modular.postpartum.cn }</span></span>
							</Menu.Item>
						</MenuItemGroup>
						<MenuItemGroup key="noticeAgentMenu" title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-notice' ] } />
							<span className={ styles.m2 }>通知代理</span></span> }>
							<Menu.Item key={ modular.chronicDisease.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-manxingjibing' ] } />
									<span className={ styles.m3 }>{ modular.chronicDisease.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.newestPolicy.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-zhengce' ] } />
									<span className={ styles.m3 }>{ modular.newestPolicy.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.newestActivity.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-huodong' ] } />
									<span className={ styles.m3 }>{ modular.newestActivity.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.antenatalCare.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-yunfu' ] } />
									<span className={ styles.m3 }>{ modular.antenatalCare.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.childHealth.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-quanshengzhengzhuang' ] } />
									<span className={ styles.m3 }>{ modular.childHealth.cn }</span></span>
							</Menu.Item>
						</MenuItemGroup>
					</SubMenu>
					<SubMenu key="1"
						title={ <span className={ styles.menuItem }>
							<i className={ styles.wof1 + ' ' + styles[ 'woc-jiankang' ] } />
							<span className={ styles.m1 }>云健管</span></span> }>
						<MenuItemGroup key="trackingReminderMenu"
							title={ <span className={ styles.menuItem }>
								<i className={ styles.wof2 + ' ' + styles[ 'woc-tixing' ] } />
								<span className={ styles.m2 }>跟踪提醒</span></span> }>
							<Menu.Item key={ modular.medication.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-yongyaotixing' ] } />
									<span className={ styles.m3 }>{ modular.medication.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.curativeEffect.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-changyongyao' ] } />
									<span className={ styles.m3 }>{ modular.curativeEffect.cn }</span></span>
							</Menu.Item>
						</MenuItemGroup>
						<MenuItemGroup key="chronicDiseaseMenu" title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-assistant' ] } />
							<span className={ styles.m2 }>慢病随访</span></span> }>
							<Menu.Item key={ modular.hypertension.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-gxy' ] } />
									<span className={ styles.m3 }>{ modular.hypertension.cn }</span></span>
							</Menu.Item>
							<Menu.Item key={ modular.diabetes.url }>
								<span className={ styles.menuItem }>
									<i className={ styles.wof3 + ' ' + styles[ 'woc-tnb' ] } />
									<span className={ styles.m3 }>{ modular.diabetes.cn }</span></span>
							</Menu.Item>
						</MenuItemGroup>
					</SubMenu>
					<SubMenu key="2"
						title={ <span className={ styles.menuItem }>
							<i className={ styles.wof1 + ' ' + styles[ 'woc-history' ] } />
							<span className={ styles.m1 }>查看历史订单</span></span> }>
						<Menu.Item key='jump1'>
							<a className={ styles.menuItem } target="blank"
								href={ `http://api.jksmpt.com/ylk/views/myEntrust.jsp?doctorId=${user.doctorId}&status=2` }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-finished' ] } />
								<span className={ styles.m3 }>{ modular.finishList.cn }</span></a>
						</Menu.Item>
						<Menu.Item key='jump2'>
							<a className={ styles.menuItem } target="blank"
								href={ `http://api.jksmpt.com/ylk/views/myEntrust.jsp?doctorId=${user.doctorId}&status=1` }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-untreated' ] } />
								<span className={ styles.m3 }>{ modular.unfinishList.cn }</span></a>
						</Menu.Item>
					</SubMenu>
				</Menu>
				:
				<Menu
					defaultSelectedKeys={ [ pathname ] }
					defaultOpenKeys={ [ '2' ] }
					mode="inline"
					theme="dark"
					onClick={ onSelect }
				>
					<SubMenu key="2" title={ <span className={ styles.menuItem }>
						<i className={ styles.wof1 + ' ' + styles[ 'woc-xuqiudengji' ] } />
						<span className={ styles.m1 }>工单列表</span></span> }>
						<Menu.Item key={ modular.unfinished.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-finished' ] } />
								<span className={ styles.m3 }>{ modular.unfinished.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.finish.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-untreated' ] } />
								<span className={ styles.m3 }>{ modular.finish.cn }</span></span>
						</Menu.Item>
					</SubMenu>
				</Menu>
			}
		</div>
	);
}

export default Sidebar;
