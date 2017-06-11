import React from 'react';
import { Table, Icon } from 'antd';
import styles from './InfoTable.less';

const InfoTable = () => {
  // 根据委托单名称定义表头的显示项
  const config = {
    ChronicDisease: [ 'name', 'sex' ],
  }
  // 完整表头定义
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      className: true ? 'hide' : 'show'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      key: 'tel',
    },
  ];

  const data = [
    { key: 1, name: '1', sex: '1', birthday: '1', tel: '1' },
    { key: 2, name: '2', sex: '2', birthday: '2', tel: '2' },
    { key: 3, name: '3', sex: '3', birthday: '3' },
  ];

  return (
    <Table className={styles.table} bordered columns={columns} dataSource={data} size="middle" pagination={false} />
  )
}

export default InfoTable;