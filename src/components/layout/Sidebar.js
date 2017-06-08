import React from 'react';
import styles from './Sidebar.less';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

function Sidebar() {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  return (
    <div className={styles.normal}>
      <Tree showLine defaultExpandAll onSelect={onSelect}>
        <TreeNode key="0" title="云医助">
          <TreeNode key="signFamily" title="签约家庭" />
          <TreeNode key="bookingAgent" title="预约代理">
            <TreeNode key="postpartum" title="预约产后访视" />
            <TreeNode key="residentSign" title="预约居民签约" />
            <TreeNode key="residentInspect" title="预约居民体检" />
            <TreeNode key="newborn" title="预约新生儿家庭访视" />
          </TreeNode>
          <TreeNode key="noticeAgent" title="通知代理">
            <TreeNode key="childHealth" title="儿童健康随访通知" />
            <TreeNode key="chronicDisease" title="慢性病随访通知" />
            <TreeNode key="vaccination" title="疫苗接种通知" />
            <TreeNode key="antenatalCare" title="孕产妇产检通知" />
            <TreeNode key="healthManual" title="孕产妇建立保健手册通知" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  );
}

export default Sidebar;
