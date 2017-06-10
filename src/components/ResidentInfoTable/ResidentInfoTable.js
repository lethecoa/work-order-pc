import React from 'react';
import styles from './ResidentInfoTable.less';
import xlsx from 'node-xlsx';
import { Table, Button } from 'antd';
import InfoTable from './InfoTabel';

function ResidentInfoTable() {
  /**
   * 读取excel数据
   */
  const readData = () => {

  }
  return (
    <div className={styles.normal}>
      <div className={styles.title}>
        <div className={styles.button}>
          <Button size="small">下载该表格</Button>&nbsp;
          <Button size="small">导入居民信息</Button>
        </div>
        居民信息表样本
      </div>
      <InfoTable />
    </div>
  );
}

export default ResidentInfoTable;
