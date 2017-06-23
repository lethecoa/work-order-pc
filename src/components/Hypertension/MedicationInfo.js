import React from 'react';
import { Form,Table, Input, Icon, Button, Popconfirm } from 'antd';
import styles from './MedicationInfo.less';
import {config} from '../../common'
import {EditableCell} from '../../components';
  class MedicationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'medicalOrder',
        width: '8%',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, 'medicalOrder')}
          />
        ),
      }, {
      title: '药品名称',
      dataIndex: 'medicalName',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'medicalName')}
        />
      ),
    }, {
      title: '用法(次/每日)',
      dataIndex: 'usage',
      width: '12%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'usage')}
        />
      ),
    }, {
      title: '用量（mg/每次）',
      dataIndex: 'dosage',
      width: '12%',
      render: (text, record, index) => (
      <EditableCell
        value={text}
        onChange={this.onCellChange(index, 'dosage')}
      />
    )},
    {
        title: '备注',
        dataIndex: 'remark',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, 'remark')}
          />
        ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length >= 1 ?
            (
              <Popconfirm title="确定删除该药品?" onConfirm={() => this.onDelete(index)}>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

    this.state = {
      dataSource: [],
      count: 0,
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      medicalOrder: count+1,
      medicalName: ``,
      usage: '',
      dosage: ``,
      remark:''
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    const disable=true;
    return (
      <div>
        <Button className={styles.editableAddBtn} onClick={this.handleAdd} disabled={disable}>添加药品</Button>
        <Table bordered dataSource={dataSource} columns={columns}  pagination={false} />
      </div>
    );
  }

}
export default MedicationInfo;
