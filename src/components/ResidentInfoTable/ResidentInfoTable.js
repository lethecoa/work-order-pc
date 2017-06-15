import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './ResidentInfoTable.less';
import { Table, Button, Icon, Upload, message, Modal, notification } from 'antd';
import InfoTable from './InfoTabel';
import { fun, modular, api, config } from '../../common';

const download = Symbol( 'download' );
const upload = Symbol( 'upload' );
const uploadError = Symbol( 'uploadError' );
const uploadSuccess = Symbol( 'uploadSuccess' );
const moduleName = '居民信息表控件(ResidentInfoTable)';

// 默认数据
const data = [
  { key: 1, name: '张三', sex: '男', birthday: '2000-10-10', tell: '18864485551' },
  { key: 2, name: '李四', sex: '女', birthday: '1998-05-16', tell: '13951775012' },
  { key: 3, name: '王五', sex: '男', birthday: '1986-09-03', tell: '13512542197' },
];

class ResidentInfoTable extends React.Component {
  constructor( props ) {
    super( props );
    fun.print( props );
    this.state = {
      ritRef: modular[ props.name ][ 'ritRef' ],
      infoData: data,
      disabled: props.disabled,
      show: props.userType === config.userType.doctor ? '' : 'hide',
    }
    let userType = props.userType;
    if ( userType ) {
      this.setState
    }
  }
  // public function
  /**
   * 获取用户信息表数据
   */
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
      fun.print( res.entity, '读取Excel完成', moduleName );
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
            <a onClick={this.getData}>测试</a>&nbsp;
            <Button size="small" disabled={this.props.disabled} onClick={this[ download ]}
              icon="download" className={this.state.show}>下载该表格</Button>&nbsp;
            <Upload action={api.uploadExcel} onChange={this[ upload ]}
              data={{ itemId: this.state.ritRef }} showUploadList={false}>
              <Button size="small" disabled={this.props.disabled} onClick={this[ upload ]}
                icon="upload" className={this.state.show}>导入居民信息</Button></Upload>
          </div>
          居民信息表样本
        </div>
        <InfoTable name={this.props.name} dataSource={this.state.infoData}
          userType={this.props.userType} ref="infoTable" />
      </div>
    );
  }
}

export default ResidentInfoTable;
