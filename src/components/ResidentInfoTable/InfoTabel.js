import React from 'react';
import { Table } from 'antd';
import styles from './InfoTable.less';
import { config, fun } from '../../common';

const getTableProp = Symbol( 'getTableProp' );
const moduleName = '信息表控件(infoTable)';
let columns = [];

// 默认数据
const data = [
  { key: 1, name: '张三', sex: '男', birthday: '2000-10-10', tel: '1886448555' },
  { key: 2, name: '李四', sex: '女', birthday: '1998-05-16', tel: '13951775012' },
  { key: 3, name: '王五', sex: '男', birthday: '1986-09-03', tel: '13512542197' },
];
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
  ];
}

class InfoTable extends React.Component {
  constructor( props ) {
    super( props );
    let columnConfig = doctorConfig[ props.name ];
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
        dataSource={data} size="middle" pagination={false} ref="table" />
    )
  }
}

export default InfoTable;