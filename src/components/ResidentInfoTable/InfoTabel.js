import React from 'react';
import { Table, Pagination, Radio, Popconfirm } from 'antd';
import { config, fun, modular } from '../../common';
import styles from './InfoTable.less';
import EditableInputCell from './EditableInputCell';

const getTableProp = Symbol( 'getTableProp' );
const moduleName = '信息表控件(infoTable)';
const RadioGroup = Radio.Group;
const STATUS = { general: 'save', editing: 'cancel' }

function handleChange( key, index, value ) {

}

/**
 * 创建可编辑的 Input 单元格
 * 
 * @param {string} text 
 * @param {object} data 
 * @param {number} index 
 * @param {string} key 
 * @returns 
 */
function renderInputCell( text, data, index, key ) {
  let cell = data[ index ];
  if ( typeof cell[ key ] === 'undefined' ) {
    cell[ key ] = { editable: true, value: '' };
    cell[ 'status' ] = STATUS.general;
  }
  const { status } = cell;
  const { editable } = cell[ key ];

  if ( status === STATUS.general ) {
    return text;
  }
  return ( <EditableInputCell
    editable={editable}
    value={cell[ key ].value}
    onChange={value => this.handleChange( key, index, value )}
    status={status}
  /> );
}

/**
 * 用户信息表控件
 * 
 * @class InfoTable
 * @extends {React.Component}
 */
class InfoTable extends React.Component {
  constructor( props ) {
    super( props );
    let columnConfig = props.userType === config.userType.doctor ? modular[ props.name ][ 'ritDoctor' ] : modular[ props.name ][ 'ritWorker' ];
    this.columns = [
      {
        title: '姓名',
        dataIndex: config.ritField.name,
        key: config.ritField.name,
        className: columnConfig.includes( config.ritField.name ) ? '' : 'hide'
      },
      {
        title: '性别',
        dataIndex: config.ritField.sex,
        key: config.ritField.sex,
        className: columnConfig.includes( config.ritField.sex ) ? '' : 'hide'
      },
      {
        title: '出生日期',
        dataIndex: config.ritField.birthday,
        key: config.ritField.birthday,
        className: columnConfig.includes( config.ritField.birthday ) ? '' : 'hide'
      },
      {
        title: '联系电话',
        dataIndex: config.ritField.tel,
        key: config.ritField.tel,
        className: columnConfig.includes( config.ritField.tel ) ? '' : 'hide'
      },
      {
        title: '疾病情况',
        dataIndex: config.ritField.disease,
        key: config.ritField.disease,
        className: columnConfig.includes( config.ritField.disease ) ? '' : 'hide'
      },
      {
        title: '药品名称',
        dataIndex: config.ritField.drugs,
        key: config.ritField.drugs,
        className: columnConfig.includes( config.ritField.drugs ) ? '' : 'hide'
      },
      {
        title: '建卡时间',
        dataIndex: config.ritField.cardDate,
        key: config.ritField.cardDate,
        className: columnConfig.includes( config.ritField.cardDate ) ? '' : 'hide'
      },
      {
        title: '是否到场',
        dataIndex: config.ritField.present,
        key: config.ritField.present,
        className: columnConfig.includes( config.ritField.present ) ? '' : 'hide',
        render: ( text, record, index ) => (
          <RadioGroup value={text}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>
        )
      },
      {
        title: '通知情况',
        dataIndex: config.ritField.booking,
        key: config.ritField.booking,
        className: columnConfig.includes( config.ritField.booking ) ? '' : 'hide',
        render: ( text, record, index ) => renderInputCell( text, this.state.data, index, config.ritField.booking )
      },
      {
        title: '操作栏',
        dataIndex: config.ritField.operation,
        key: config.ritField.operation,
        className: props.userType === config.userType.worker ? '' : 'hide',
        render: ( text, record, index ) => {
          const status = this.state.data[ index ].status; //record.status;
          return (
            <div className="editable-row-operations">
              {
                status === STATUS.editing ?
                  <span>
                    <a onClick={() => this.editDone( index, 'save' )}>保存</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone( index, 'cancel' )}>
                      <a>撤销</a>
                    </Popconfirm>
                  </span>
                  :
                  <span>
                    <a onClick={() => this.edit( index )}>编辑</a>
                  </span>
              }
            </div>
          );
        }
      }
    ];
    this.state = {
      data: props.dataSource,
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        defaultCurrent: 1,
        total: 0,
        pageSize: 5,
      },
    }
  }
  // public function
  getData = () => {
    return this.state.data;
  }
  edit = ( index ) => {
    const { data } = this.state;
    data[ index ][ 'status' ] = STATUS.editing;
    this.setState( { data } );
  }

  editDone = ( index, type ) => {

  }
  // private function
  render() {
    return (
      <Table className={styles.table} bordered columns={this.columns}
        dataSource={this.props.dataSource} size="middle" pagination={this.state.pagination} />
    )
  }
}

export default InfoTable;