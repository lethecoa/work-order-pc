import {browserHistory} from "dva/router";
import styles from './Sidebar.less';
import {Menu} from 'antd';
import {modular} from '../../common';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Sidebar( { pathname } ) {
	const onSelect = ( obj ) => {
		if ( obj.key !== '' ) {
			browserHistory.push( obj.key );
		}
	};

	return (
		<div className={ styles.menu }>
			<Menu
				defaultSelectedKeys={ [ pathname ] }
				defaultOpenKeys={ [ '0', '1' ] }
				mode="inline"
				theme="dark"
				onClick={ onSelect }
			>
				<Menu.Item key={ modular.index.url }>
					<span className={ styles.menuItem }>
						<i className={ styles.wof1 + ' ' + styles[ 'woc-shouye' ] }></i>
						<span className={ styles.m1 }>{ modular.index.cn }</span></span>
				</Menu.Item>
				<SubMenu key="0" title={ <span className={ styles.menuItem }>
					<i className={ styles.wof1 + ' ' + styles[ 'woc-yyz' ] }></i>
					<span className={ styles.m1 }>云医助</span></span> }>
					<MenuItemGroup key="bookingAgentMenu" title={ <span className={ styles.menuItem }>
						<i className={ styles.wof2 + ' ' + styles[ 'woc-yuyue' ] }></i>
						<span className={ styles.m2 }>预约代理</span></span> }>
						<Menu.Item key={ modular.residentSign.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-jiatingyisheng' ] }></i>
								<span className={ styles.m3 }>{ modular.residentSign.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.residentInspect.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-tijian' ] }></i>
								<span className={ styles.m3 }>{ modular.residentInspect.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.newborn.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-xset' ] }></i>
								<span className={ styles.m3 }>{ modular.newborn.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.postpartum.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-chanhoutiantijian' ] }></i>
								<span className={ styles.m3 }>{ modular.postpartum.cn }</span></span>
						</Menu.Item>
					</MenuItemGroup>
					<MenuItemGroup key="noticeAgentMenu"
					               title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-notice' ] }></i>
							<span className={ styles.m2 }>通知代理</span></span> }>
						<Menu.Item key={ modular.chronicDisease.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-manxingjibing' ] }></i>
								<span className={ styles.m3 }>{ modular.chronicDisease.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.newestPolicy.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-zhengce' ] }></i>
								<span className={ styles.m3 }>{ modular.newestPolicy.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.newestActivity.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-huodong' ] }></i>
								<span className={ styles.m3 }>{ modular.newestActivity.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.antenatalCare.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-yunfu' ] }></i>
								<span className={ styles.m3 }>{ modular.antenatalCare.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.childHealth.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-quanshengzhengzhuang' ] }></i>
								<span className={ styles.m3 }>{ modular.childHealth.cn }</span></span>
						</Menu.Item>
					</MenuItemGroup>
				</SubMenu>
				<SubMenu key="1"
				         title={ <span className={ styles.menuItem }>
						<i className={ styles.wof1 + ' ' + styles[ 'woc-jiankang' ] }></i>
						<span className={ styles.m1 }>云健管</span></span> }>
					<MenuItemGroup key="trackingReminderMenu"
					               title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-tixing' ] }></i>
							<span className={ styles.m2 }>跟踪提醒</span></span> }>
						<Menu.Item key={ modular.medication.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-yongyaotixing' ] }></i>
								<span className={ styles.m3 }>{ modular.medication.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.curativeEffect.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-changyongyao' ] }></i>
								<span className={ styles.m3 }>{ modular.curativeEffect.cn }</span></span>
						</Menu.Item>
					</MenuItemGroup>
					<MenuItemGroup key="chronicDiseaseMenu"
					               title={ <span className={ styles.menuItem }>
							<i className={ styles.wof2 + ' ' + styles[ 'woc-assistant' ] }></i>
							<span className={ styles.m2 }>慢病随访</span></span> }>
						<Menu.Item key={ modular.hypertension.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-gxy' ] }></i>
								<span className={ styles.m3 }>{ modular.hypertension.cn }</span></span>
						</Menu.Item>
						<Menu.Item key={ modular.diabetes.url }>
							<span className={ styles.menuItem }>
								<i className={ styles.wof3 + ' ' + styles[ 'woc-tnb' ] }></i>
								<span className={ styles.m3 }>{ modular.diabetes.cn }</span></span>
						</Menu.Item>
					</MenuItemGroup>
				</SubMenu>
			</Menu>
		</div>
	);
}

export default Sidebar;
