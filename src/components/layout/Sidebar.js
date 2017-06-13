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
					<TreeNode key={modular.signFamily.name} title={modular.signFamily.cn}/>
					<TreeNode key="bookingAgentMenu" title="预约代理">
						<TreeNode key={modular.residentSign.name} title={modular.residentSign.cn}/>
						<TreeNode key="residentInspect" title="预约居民体检"/>
						<TreeNode key="newborn" title="预约新生儿家庭访视"/>
						<TreeNode key="postpartum" title="预约产后访视"/>
					</TreeNode>
					<TreeNode key="noticeAgentMenu" title="通知代理">
						<TreeNode key={modular.chronicDisease.name} title={modular.chronicDisease.cn}/>
						<TreeNode key="newestPolicy" title="最新政策通知"/>
						<TreeNode key="newestActivity" title="最新活动通知"/>
						<TreeNode key="antenatalCare" title="孕产妇产检通知"/>
						<TreeNode key="childHealth" title="儿童健康随访通知"/>
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
