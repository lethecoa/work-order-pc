import React from 'react';
import { Table } from 'antd';
import styles from './InfoTable.less';
import { config, fun, modular } from '../../common';

const getTableProp = Symbol( 'getTableProp' );
const moduleName = '信息表控件(infoTable)';
let columns = [];

/**
 * 完整表头定义
 */
function getColumns( columnConfig ) {
  return columns = [
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
  ];
}

class InfoTable extends React.Component {
  constructor( props ) {
    super( props );
    let columnConfig = modular[ props.name ][ 'ritDoctor' ];
    columns = getColumns( columnConfig );
  }
  // public function
  getData = () => {
    return this[ getTableProp ]().dataSource;
  }
  // private function
  /**
   * 获取 Table 组件的 props
   */
  [ getTableProp ] = () => {
    return this.refs.table.props;
  }
  render() {
    return (
      <Table className={styles.table} bordered columns={columns}
        dataSource={this.props.dataSource} size="middle" pagination={false}
        ref="table" />
    )
  }
}

export default InfoTable;