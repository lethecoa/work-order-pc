import React from 'react';
import { Table, Pagination, Radio, Popconfirm } from 'antd';
import { config, fun, modular } from '../../common';
import styles from './InfoTable.less';
import EditableInputCell from './EditableInputCell';
import EditableRadioCell from './EditableRadioCell';
import FollowUpCell from './FollowUpCell';

const moduleName = '信息表控件(infoTable)';
const RadioGroup = Radio.Group;
const { name, sex, birthday, tel, cardDate, disease, diseaseCase, drugs, present,
  remark, operation, visit, followUp } = config.ritField;
const CALL_BACK_STATUS = { save: 'save', submit: 'submit' };
/**
 * 用户信息表控件
 * 
 * @class InfoTable
 * @extends {React.Component}
 */
class InfoTable extends React.Component {
  allColumns = {
    [ name.key ]: {
      title: name.cn,
      width: 60,
      dataIndex: name.key,
      key: name.key,
    },
    [ sex.key ]: {
      title: sex.cn,
      width: 60,
      dataIndex: sex.key,
      key: sex.key,
    },
    [ birthday.key ]: {
      title: birthday.cn,
      width: 120,
      dataIndex: birthday.key,
      key: birthday.key,
    },
    [ tel.key ]: {
      title: tel.cn,
      width: 120,
      dataIndex: tel.key,
      key: tel.key,
    },
    [ cardDate.key ]: {
      title: cardDate.cn,
      width: 200,
      dataIndex: cardDate.key,
      key: cardDate.key,
    },
    [ disease.key ]: {
      title: disease.cn,
      width: 280,
      dataIndex: disease.key,
      key: disease.key,
    },
    [ diseaseCase.key ]: {
      title: diseaseCase.cn,
      width: 280,
      dataIndex: diseaseCase.key,
      key: diseaseCase.key,
    },
    [ drugs.key ]: {
      title: drugs.cn,
      width: 280,
      dataIndex: drugs.key,
      key: drugs.key,
    },
    [ present.key ]: {
      title: present.cn,
      width: 150,
      dataIndex: present.key,
      key: present.key,
      render: ( text, record, index ) => this.renderRadioCell( text, index, present.key )
    },
    [ visit.key ]: {
      title: visit.cn,
      width: 150,
      dataIndex: visit.key,
      key: visit.key,
      render: ( text, record, index ) => this.renderRadioCell( text, index, visit.key )
    },
    [ remark.key ]: {
      title: remark.cn,
      width: 280,
      dataIndex: remark.key,
      key: remark.key,
      render: ( text, record, index ) => this.renderInputCell( text, index, remark.key )
    },
    [ followUp.key ]: {
      title: followUp.cn,
      width: 120,
      dataIndex: followUp.key,
      key: followUp.key,
      render: ( text, record, index ) => this.renderFollowUpCellCell( text, index, followUp.key )
    },
    [ operation.key ]: {
      title: operation.cn,
      width: 160,
      dataIndex: operation.key,
      key: operation.key,
      render: ( text, record, index ) => {
        const myStatus = record.myStatus;
        return (
          <div className="editable-row-operations">
            {
              myStatus === config.ritStatus.editing ?
                <span>
                  <a onClick={() => this.save( index )}>保存</a>
                  &nbsp;|&nbsp;
                  <Popconfirm title="取销将不保存" onConfirm={() => this.cancel( index )}>
                    <a>取销</a>
                  </Popconfirm>
                </span>
                :
                <span className={this.state.operationStatus ? 'hide' : ''}>
                  <a onClick={() => this.edit( index )}>编辑</a>
                </span>
            }
            <span className={this.state.operationStatus ? 'hide' : ''}>
              &nbsp;|&nbsp;
              <a onClick={() => this.submit( index )}
                style={this.state.operationStatus ? { color: '#b1b8bd' } : { color: '#C00' }}>提交</a>
            </span>
            <a className={!this.state.operationStatus ? 'hide' : ''}
              onClick={() => this.revoke( index )}>撤回</a>
          </div>
        );
      }
    }
  };
  constructor( props ) {
    super( props );
    fun.printLoader( moduleName );
    this.monitor = props.monitor;

    this.state = {
      data: props.dataSource,
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        defaultCurrent: 1,
        total: 0,
        pageSize: 5,
      },
      saveCallback: this.props.onSave,
      submitCallback: this.props.onSubmit,
      /** 用户操作的类型：保存或者提交 */
      callBackStatus: '',
      operationStatus: false,
      columns: this.getColums(),
      parentName: props.name,
    }
  }
  /**
   * 获取表头数据
   */
  getColums = () => {
    let columnConfig = this.props.userType === config.userType.doctor ?
      modular[ this.props.name ][ 'ritDoctor' ] : modular[ this.props.name ][ 'ritWorker' ];
    return columnConfig.map(( item, index, arr ) => {
      if ( this.allColumns.hasOwnProperty( item ) )
        return this.allColumns[ item ];
    } );
  }
  /**
   * 创建可编辑的 Input 单元格
   */
  renderInputCell = ( value, index, key ) => {
    const { myStatus } = this.state.data[ index ];

    return ( <EditableInputCell
      name={key + '_input_' + index}
      value={value}
      onChange={( name, value ) => this.handleChange( name, key, index, value )}
      myStatus={myStatus}
    /> );
  }
  /**
   * 创建随访情况单元格（未完成）
   */
  renderFollowUpCellCell = ( value, index, key ) => {
    return ( <FollowUpCell
      name={key + '_appointment_' + index}
    /> );
  }
  /**
   * 创建可编辑的 Radio 单元格
   */
  renderRadioCell = ( value, index, key ) => {
    const { myStatus } = this.state.data[ index ];

    return ( <EditableRadioCell
      name={key + '_radio_' + index}
      value={value}
      onChange={( name, value ) => this.handleChange( name, key, index, value )}
      myStatus={myStatus}
    /> );
  }
  /**
   * input组件的数据发生更改时
   */
  handleChange = ( name, key, index, value ) => {
    const { data, callBackStatus, saveCallback, submitCallback } = this.state;
    let item = data[ index ];
    item.monitor--;
    if ( item[ key ] !== value ) {
      item[ key ] = value;
      this.setState( { data } );
    }
    fun.print( value, 'handleChange', name );

    if ( item.monitor <= 0 ) {
      let row = this.rebuildData( item );
      if ( callBackStatus === CALL_BACK_STATUS.save && typeof saveCallback === 'function' ) saveCallback( index, row );
      if ( callBackStatus === CALL_BACK_STATUS.submit && typeof submitCallback === 'function' ) {
        row[ 'status' ] = '2';
        submitCallback( index, row );
      }
    }
  }
  /**
   * 重构数据，剔除掉提交时不需要的字段
   */
  rebuildData = ( item ) => {
    let row = {};
    let ritField = config.ritField;
    for ( let key in item ) {
      for ( let field in ritField ) {
        if ( ritField[ field ].key === key && ritField[ field ].need ) {
          row[ key ] = item[ key ];
        }
      }
    }
    return row;
  }
  /**
   * 点击编辑按钮
   */
  edit = ( index ) => {
    const { data } = this.state;
    data[ index ][ 'myStatus' ] = config.ritStatus.editing;
    data[ index ][ 'monitor' ] = this.monitor;
    this.setState( { data } );
  }
  /**
   * 确定保存：更新数据，并回到非编辑状态
   */
  save = ( index ) => {
    const { data } = this.state;
    data[ index ][ 'myStatus' ] = config.ritStatus.general;
    this.setState( { data: data, callBackStatus: CALL_BACK_STATUS.save } );
  }
  /**
   * 提交数据：再次刷新数据，这些提交的数据会进入到 “已处理” 的页面中，
   * 不刷新时依然保留在 “未处理” 也就是当前编辑页面内
   */
  submit = ( index ) => {
    const { data, submitCallback } = this.state;
    if ( data[ index ][ 'myStatus' ] === config.ritStatus.general ) {
      let row = this.rebuildData( data[ index ] );
      row[ 'status' ] = '2';
      if ( typeof submitCallback === 'function' ) submitCallback( row, successCallback );
    }
    else {
      data[ index ][ 'myStatus' ] = config.ritStatus.general;
      this.setState( { data: data, callBackStatus: CALL_BACK_STATUS.submit } );
    }
  }
  /**
   * 成功后调用
   */
  successCallback = ( serviceId ) => {
    let index = this.state.data.map(( item, index, arr ) => {
      if ( row.serviceId !== serviceId )
        return index;
    } );
    if ( index !== 'undefined' && index > 0 )
      this.setState( { dataSource: this.state.dataSource.splice( index, 1 ) } );
  }
  /**
   * 撤销已处理的数据
   */
  revoke = ( index ) => {
    const { data, submitCallback } = this.state;
    let row = this.rebuildData( data[ index ] );
    row[ 'status' ] = '1';
    if ( typeof submitCallback === 'function' ) submitCallback( index, row );
  }
  /**
   * 确认撤销：取消刚刚录入的数据，并回到非编辑状态
   */
  cancel = ( index ) => {
    const { data } = this.state;
    data[ index ][ 'myStatus' ] = config.ritStatus.cancel;
    this.setState( { data } );
  }

  render() {
    return (
      <Table className={styles.table} bordered columns={this.state.columns} rowKey="rownum"
        dataSource={this.state.data} size="middle" pagination={this.state.pagination} />
    )
  }

  componentWillReceiveProps( nextProps ) {
    let data = nextProps.dataSource;
    let operationStatus = true;
    if ( data !== this.state.data ) {
      if ( typeof data !== 'undefined' && data.length > 0 ) {
        operationStatus = data[ 0 ].status === '2' ? true : false;
      }
      this.setState( { data: data, operationStatus: operationStatus } );
    }
    if ( nextProps.name != this.state.parentName )
      this.setState( { columns: this.getColums() } );
  }
}

export default InfoTable;