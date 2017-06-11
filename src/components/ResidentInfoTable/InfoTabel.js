import React from 'react';
import { Table, Icon } from 'antd';
import styles from './InfoTable.less';

const InfoTable = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
    { key: 1, name: '', sex: '', birthday: '', tel: '' },
    { key: 2, name: '', sex: '', birthday: '', tel: '' },
    { key: 3, name: '', sex: '', birthday: '', tel: '' },
  ];

  return (
    <Table className={styles.table} bordered columns={columns} dataSource={data} size="middle" pagination={false} />
  )
}

export default InfoTable;