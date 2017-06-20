import {browserHistory} from "dva/router";
import styles from './Sidebar.less';
import {Tree} from 'antd';
import {modular} from '../../common';

const TreeNode = Tree.TreeNode;

function Sidebar() {
	const onSelect = ( selectedKeys, info ) => {
		browserHistory.push( selectedKeys[ 0 ] );
	}
	return (
		<Tree showLine defaultExpandAll onSelect={onSelect} className={styles.menu}>
			<TreeNode key="0" title="云医助">

				<TreeNode key={modular.signFamily.url} title={modular.signFamily.cn}/>
				<TreeNode key="bookingAgentMenu" title="预约代理">
					<TreeNode key={modular.residentSign.url} title={modular.residentSign.cn}/>
					<TreeNode key={modular.residentInspect.url} title={modular.residentInspect.cn}/>
					<TreeNode key={modular.newborn.url} title={modular.newborn.cn}/>
					<TreeNode key={modular.postpartum.url} title={modular.postpartum.cn}/>
				</TreeNode>
				<TreeNode key="noticeAgentMenu" title="通知代理">
					<TreeNode key={modular.chronicDisease.url} title={modular.chronicDisease.cn}/>
					<TreeNode key={modular.newestPolicy.url} title={modular.newestPolicy.cn}/>
					<TreeNode key={modular.newestActivity.url} title={modular.newestActivity.cn}/>
					<TreeNode key={modular.antenatalCare.url} title={modular.antenatalCare.cn}/>
					<TreeNode key={modular.childHealth.url} title={modular.childHealth.cn}/>
					{/*<TreeNode key="vaccination" title="疫苗接种通知" />
					 <TreeNode key="healthManual" title="孕产妇建立保健手册通知" />*/}
				</TreeNode>
			</TreeNode>
			<TreeNode key="1" title="云健管">
				<TreeNode key="trackingReminderMenu" title="跟踪提醒">
					<TreeNode key={modular.medication.url} title={modular.medication.cn}/>
					<TreeNode key={modular.curativeEffect.url} title={modular.curativeEffect.cn}/>
				</TreeNode>
				<TreeNode key="chronicDiseaseMenu" title="慢病随访">
					<TreeNode key={modular.hypertension.url} title={modular.hypertension.cn}/>
					<TreeNode key={modular.diabetes.url} title={modular.diabetes.cn}/>
				</TreeNode>
			</TreeNode>
		</Tree>
	);
}

export default Sidebar;
