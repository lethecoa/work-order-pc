import React from 'react';
import styles from './ResidentInfoTable.less';
import { Table, Button, Icon } from 'antd';
import InfoTable from './InfoTabel';
import { fun, modular } from '../../common';

const download = Symbol( 'download' );
const load = Symbol( 'load' );
const moduleName = '居民信息表控件(ResidentInfoTable)';

class ResidentInfoTable extends React.Component {
  // public function
  getData = () => {
    return this.refs.infoTable.getData();
  }
  // private function
  /**
   * 下载excel模版
   */
  [ download ] = () => {

  }
  /**
   * 读取excel数据
   */
  [ load ] = () => {

  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>
          <div className={styles.button}>
            <Button size="small" onClick={this[ download ]} icon="download">下载该表格</Button>&nbsp;
            <Button size="small" onClick={this[ load ]}>导入居民信息</Button>
          </div>
          居民信息表样本
        </div>
        <InfoTable name={this.props.name} ref="infoTable" />
      </div>
    );
  }
}

export default ResidentInfoTable;
