import React from 'react';
import { Table, Icon } from 'antd';
import styles from './InfoTable.less';
import { fun } from '../../common';

const getTableProp = Symbol( 'getTableProp' );
const moduleName = '信息表控件(infoTable)';
let columns = [];

/**
 * 根据委托单名称定义表头的显示项
 */
const field = {
  name: 'name', sex: 'sex', birthday: 'birthday', tel: 'tel',
  disease: 'disease', cardDate: 'cardDate', drugs: 'drugs'
}
/**
 * 每个模块显示的数据字段配置
 */
const doctorConfig = {
  SignFamily: [ field.name, field.sex, field.birthday, field.tel ],
  ChronicDisease: [ field.name, field.sex, field.birthday, field.tel ],
}
// 默认数据
const data = [
  { key: 1, name: '张三', sex: '男', birthday: '2000-10-10', tel: '1886448555' },
  { key: 2, name: '李四', sex: '女', birthday: '1998-05-16', tel: '13951775012' },
  { key: 3, name: '王五', sex: '男', birthday: '1986-09-03', tel: '13512542197' },
];
/**
 * 完整表头定义
 */
function getColumns( config ) {
  return columns = [
    {
      title: '姓名',
      dataIndex: field.name,
      key: field.name,
      className: config.includes( field.name ) ? '' : 'hide'
    },
    {
      title: '性别',
      dataIndex: field.sex,
      key: field.sex,
      className: config.includes( field.sex ) ? '' : 'hide'
    },
    {
      title: '出生日期',
      dataIndex: field.birthday,
      key: field.birthday,
      className: config.includes( field.birthday ) ? '' : 'hide'
    },
    {
      title: '联系电话',
      dataIndex: field.tel,
      key: field.tel,
      className: config.includes( field.tel ) ? '' : 'hide'
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