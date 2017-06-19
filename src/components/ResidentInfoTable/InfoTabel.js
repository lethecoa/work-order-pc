import React from 'react';
import { Table, Pagination, Radio, Popconfirm } from 'antd';
import { config, fun, modular } from '../../common';
import styles from './InfoTable.less';
import EditableInputCell from './EditableInputCell';
import EditableRadioCell from './EditableRadioCell';
import FollowUpCell from './FollowUpCell';

const moduleName = '信息表控件(infoTable)';
const RadioGroup = Radio.Group;
const { name, sex, birthday, tel, cardDate, disease, drugs, present,
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
      dataIndex: cardDate.key,
      key: cardDate.key,
    },
    [ disease.key ]: {
      title: disease.cn,
      dataIndex: disease.key,
      key: disease.key,
    },
    [ drugs.key ]: {
      title: drugs.cn,
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
                  <Popconfirm title="确定保存吗？" onConfirm={() => this.save( index )}>
                    <a>保存</a>
                  </Popconfirm>
                  &nbsp;|&nbsp;
                    <Popconfirm title="取销将不保存" onConfirm={() => this.cancel( index )}>
                    <a>取销</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a disabled={this.state.operation} onClick={() => this.edit( index )}>编辑</a>
                </span>
            }
            &nbsp;|&nbsp;
            <Popconfirm title="确定提交吗？" onConfirm={() => this.submit( index )}>
              <a disabled={this.state.operation}
                style={this.state.operation ? { color: '#b1b8bd' } : { color: '#C00' }}>提交</a>
            </Popconfirm>
          </div>
        );
      }
    }
  };
  constructor( props ) {
    super( props );
    fun.printLoader( moduleName );

    this.initData( props.dataSource );
    let columnConfig = props.userType === config.userType.doctor ?
      modular[ props.name ][ 'ritDoctor' ] : modular[ props.name ][ 'ritWorker' ];
    this.columns = this.getColums( columnConfig );
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
      operation: props.operation || false,
    }
  }
  /**
   * 初始化数据，将可编辑的字段改为 object 类型
   */
  initData = ( data ) => {
    if ( typeof data !== 'undefined' && data.length > 0 ) {
      data.forEach( function ( item, index, arr ) {
        let obj = arr[ index ];
        obj.myStatus = config.ritStatus.general;
        // 监听数量，代表每一列有多少个可编辑单元格，
        // 只有当所有单元格都触发了回调函数才会执行最终的保存或提交动作
        obj.monitor = 0;

        if ( !obj.hasOwnProperty( remark.key ) ) {
          obj[ remark.key ] = '';
        }
        if ( !obj.hasOwnProperty( present.key ) ) {
          obj[ present.key ] = '0';
        }
      } );
    }
  }
  /**
   * 获取表头数据
   */
  getColums = ( columnConfig ) => {
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
      if ( callBackStatus === CALL_BACK_STATUS.submit && typeof submitCallback === 'function' ) submitCallback( index, row );
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
      if ( typeof submitCallback === 'function' ) submitCallback( index, row );
    }
    else {
      data[ index ][ 'myStatus' ] = config.ritStatus.general;
      this.setState( { data: data, callBackStatus: CALL_BACK_STATUS.submit } );
    }
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
      <Table className={styles.table} bordered columns={this.columns} rowKey="rownum"
        dataSource={this.props.dataSource} size="middle" pagination={this.state.pagination} />
    )
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( { operation: nextProps.operation } );
  }
}

export default InfoTable;