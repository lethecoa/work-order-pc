import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './ResidentInfoTable.less';
import { Table, Button, Icon, Upload, message, Modal, notification } from 'antd';
import InfoTable from './InfoTabel';
import { fun, modular, api } from '../../common';

const download = Symbol( 'download' );
const upload = Symbol( 'upload' );
const uploadError = Symbol( 'uploadError' );
const uploadSuccess = Symbol( 'uploadSuccess' );
const moduleName = '居民信息表控件(ResidentInfoTable)';

// 默认数据
const data = [
  { key: 1, name: '张三', sex: '男', birthday: '2000-10-10', tel: '18864485551' },
  { key: 2, name: '李四', sex: '女', birthday: '1998-05-16', tel: '13951775012' },
  { key: 3, name: '王五', sex: '男', birthday: '1986-09-03', tel: '13512542197' },
];

class ResidentInfoTable extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      ritRef: modular[ props.name ][ 'ritRef' ],
      infoData: data
    }
  }
  // public function
  getData = () => {
    let data = this.refs.infoTable.getData();
    fun.print( data, 'infoData', moduleName );
    return data;
  }
  // private function
  [ uploadError ] = () => {
    Modal.error( {
      title: '导入Excel文件出错',
      content: '请确认您导入的是Excel文件，或者检您的Excel文件是否有异常数据导致无法导入！',
    } );
  }
  [ uploadSuccess ] = () => {
    notification.open( {
      message: '导入居民信息成功',
      description: '居民信息已全部导入，提交前请检查核对一下您导入的信息！',
    } );
  }
  /**
   * 下载excel模版
   */
  [ download ] = () => {
    this.refs.ifile.src = '/tpl/' + this.props.name + '.xlsx';
  }
  /**
   * 读取excel数据
   */
  [ upload ] = ( info ) => {
    if ( !info.file ) return;
    if ( info.file.status === 'done' ) {
      let res = info.file.response;
      fun.print( res.entity.rows, 'done' );
      if ( res.success ) {
        this.setState( { infoData: res.entity.rows } );
        this[ uploadSuccess ]();
      } else {
        this[ uploadError ]();
      }
    }
    if ( info.file.status === 'error' ) {
      fun.print( info, 'failed' );
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>
          <iframe ref="ifile" style={{ display: 'none' }}></iframe>
          <div className={styles.button}>
            {/*<a onClick={this.getData}>测试</a>*/}
            <Button size="small" onClick={this[ download ]} icon="download">下载该表格</Button>&nbsp;
            <Upload action={api.uploadExcel} onChange={this[ upload ]}
              data={{ itemId: this.state.ritRef }} showUploadList={false}>
              <Button size="small" onClick={this[ upload ]} icon="upload">导入居民信息</Button></Upload>
          </div>
          居民信息表样本
        </div>
        <InfoTable name={this.props.name} dataSource={this.state.infoData} ref="infoTable" />
      </div>
    );
  }
}

export default ResidentInfoTable;
