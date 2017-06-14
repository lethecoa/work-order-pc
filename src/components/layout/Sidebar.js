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
		<div className={styles.normal}>
			<Tree showLine defaultExpandAll onSelect={onSelect}>
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
						<TreeNode key="medication" title="用药提醒"/>
						<TreeNode key="curativeEffect" title="用药疗效跟踪"/>
					</TreeNode>
					<TreeNode key="chronicDiseaseMenu" title="慢病随访">
						<TreeNode key="hypertension" title="高血压随访"/>
						<TreeNode key="diabetes" title="糖尿病随访"/>
					</TreeNode>
				</TreeNode>
			</Tree>
		</div>
	);
}

export default Sidebar;
