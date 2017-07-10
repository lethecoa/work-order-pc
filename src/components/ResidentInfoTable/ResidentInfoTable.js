import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './ResidentInfoTable.less';
import { Table, Button, Icon, Upload, message, Radio } from 'antd';
import InfoTable from './InfoTabel';
import { fun, modular, api, config } from '../../common';

const moduleName = '居民信息表控件(ResidentInfoTable)';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { name, sex, birthday, tel, cardDate, disease, diseaseCase, drugs, present,
  remark, operation, visit, followUp, status } = config.ritField;
const ORDER_STATUS = config.ORDER_STATUS;

/**
 * 用户信息表控件，必须提供以下几个参数
 * @name 引用它的父级控件名称
 * @userType 用户类型
 * @onSave 保存时的回调函数，
 * @onSubmit 提交时的回调函数，
 * @monitor 表格一行内有几个可编辑的单元格项
 * @disabled 控制上传excel和下载excel模板按钮是否可见
 */
export default class ResidentInfoTable extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      ritRef: modular[ props.name ][ 'ritRef' ], // 上传excel后返回的服务器对应数据字段
      data: props.data, // 外层传进来的原始数据
      showDoctor: props.userType === config.userType.doctor ? true : false,
      showWorker: props.userType === config.userType.worker ? true : false,
      isOver: props.isOver || false, // 订单处理状态：true 已完结
      untreated: 0, // 显示在切换按钮上的数字
      treated: 0,
      orderStatus: ORDER_STATUS.untreated, // 订单状态：已处理(1)、未处理(2)
    }
  }
  // public function
  /**
   * 获取用户信息表数据
   */
  getData = () => {
    let data = this.refs.infoTable.getData();
    fun.print( data, 'data', moduleName );
    return data;
  }
  setTreated = ( untreated, treated ) => {
    this.setState( { untreated, treated } );
  }
  // private function
  /**
   * 上传失败
   */
  uploadError = () => {
    fun.showError( '导入Excel文件出错',
      '请确认您导入的是Excel文件，或者检您的Excel文件是否有异常数据导致无法导入！' );
  }
  /**
   * 上传成功
   */
  uploadSuccess = () => {
    fun.showNotification( '导入居民信息成功',
      '居民信息已全部导入，提交前请检查核对一下您导入的信息！' );
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
        this.setState( { data: res.entity.rows } );
        this.uploadSuccess();
      } else {
        this.uploadError();
      }
    }
    if ( info.file.status === 'error' ) {
      fun.showError( '上传数据错误', info );
      fun.print( info, 'failed' );
    }
  }
  /**
   * 切换已处理、未处理
   */
  handlerRadioChange = ( e ) => {
    this.setState( {
      orderStatus: e.target.value
    } );
  };

  render() {
    return (
      <div className={ styles.normal }>
        <div className={ styles.title }>
          <iframe ref="ifile" style={ { display: 'none' } }></iframe>
          {/*<Button size="small" onClick={ this.getData }>打印测试数据</Button>&nbsp;*/ }
          { this.state.showDoctor ?
            <div className={ styles.button }>
              <Button size="small" disabled={ this.props.disabled } onClick={ this.download }
                icon="download">下载该表格</Button>&nbsp;
              <Upload action={ api.uploadExcel } onChange={ this.upload }
                data={ { itemId: this.state.ritRef } } showUploadList={ false }>
                <Button size="small" disabled={ this.props.disabled } onClick={ this.upload }
                  icon="upload">导入居民信息</Button>
              </Upload>
            </div>
            : '' }
          { this.state.showWorker && !this.state.isOver ?
            <div className={ styles.button }>
              <RadioGroup onChange={ this.handlerRadioChange } value={ this.state.orderStatus }
                className={ styles.treated }>
                <RadioButton value="1">待处理 ({ this.state.untreated })</RadioButton>
                <RadioButton value="2">已处理 ({ this.state.treated })</RadioButton>
              </RadioGroup>
            </div>
            : '' }
          居民信息表样本
        </div>
        <InfoTable {...this.props} orderStatus={ this.state.orderStatus } data={ this.state.data } ref="infoTable"
          setTreated={ ( untreated, treated ) => this.setTreated( untreated, treated ) } />
      </div>
    );
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      data: nextProps.data,
      ritRef: modular[ nextProps.name ][ 'ritRef' ],
      isOver: nextProps.isOver || false
    } );
  }
  /*
    shouldComponentUpdate( nextProps, nextState ) {
      return nextProps.data !== this.state.data || nextState.data !== this.state.data
        || nextProps.disabled !== this.state.disabled;
    }*/
}