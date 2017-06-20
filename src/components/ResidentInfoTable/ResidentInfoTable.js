import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './ResidentInfoTable.less';
import { Table, Button, Icon, Upload, message, Modal, notification } from 'antd';
import InfoTable from './InfoTabel';
import { fun, modular, api, config } from '../../common';

const moduleName = '居民信息表控件(ResidentInfoTable)';

/**
 * 用户信息表控件，必须提供以下几个参数
 * @name 引用它的父级控件名称
 * @userType 用户类型
 * @onSave 保存时的回调函数，
 * @onSubmit 提交时的回调函数，
 * @monitor 表格一行内有几个可编辑的单元格项
 * @disabled 控制上传excel和下载excel模板按钮是否可见
 */
class ResidentInfoTable extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      ritRef: modular[ props.name ][ 'ritRef' ],
      dataSource: props.data || [],
      disabled: props.disabled,
      operation: false,
      show: props.userType === config.userType.doctor ? '' : 'hide',
    }
  }
  // public function
  /**
   * 获取用户信息表数据
   */
  getData = () => {
    let data = this.state.dataSource;
    fun.print( data, 'dataSource', moduleName );
    return data;
  }
  // private function
  uploadError = () => {
    Modal.error( {
      title: '导入Excel文件出错',
      content: '请确认您导入的是Excel文件，或者检您的Excel文件是否有异常数据导致无法导入！',
    } );
  }
  uploadSuccess = () => {
    notification.open( {
      message: '导入居民信息成功',
      description: '居民信息已全部导入，提交前请检查核对一下您导入的信息！',
    } );
  }
  /**
   * 下载excel模版
   */
  download = () => {
    fun.print( this.refs.ifile );
    this.refs.ifile.src = modular[ this.props.name ].tpl;
  }
  /**
   * 读取excel数据
   */
  upload = ( info ) => {
    if ( !info.file ) return;
    if ( info.file.status === 'done' ) {
      let res = info.file.response;
      fun.print( res.entity, '读取Excel完成', moduleName );
      if ( res.success ) {
        this.setState( { dataSource: res.entity.rows } );
        this.uploadSuccess();
      } else {
        this.uploadError();
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
            <Button size="small" onClick={this.getData}>打印测试数据</Button>&nbsp;
            <Button size="small" disabled={this.props.disabled} onClick={this.download}
              icon="download" className={this.state.show}>下载该表格</Button>&nbsp;
            <Upload action={api.uploadExcel} onChange={this.upload}
              data={{ itemId: this.state.ritRef }} showUploadList={false}>
              <Button size="small" disabled={this.props.disabled} onClick={this.upload}
                icon="upload" className={this.state.show}>导入居民信息</Button></Upload>
          </div>
          居民信息表样本
        </div>
        <InfoTable name={this.props.name} dataSource={this.state.dataSource} monitor={this.props.monitor}
          onSave={this.props.onSave} onSubmit={this.props.onSubmit} userType={this.props.userType}
          operation={this.state.operation} />
      </div>
    );
  }

  componentWillReceiveProps( nextProps ) {
    let data = nextProps.data;
    let operation = true;
    if ( data !== this.state.dataSource ) {
      if ( typeof data !== 'undefined' && data.length > 0 ) {
        operation = data[ 0 ].status === '2' ? true : false;
      }
      this.setState( { dataSource: data, operation: operation } );
    }
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextState.dataSource !== this.state.dataSource ||
      nextState.operation !== this.state.operation;
  }

}

export default ResidentInfoTable;
