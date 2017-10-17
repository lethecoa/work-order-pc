import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Table,Pagination,Popconfirm,Button} from 'antd';
import {action, model, fun, modular} from '../../common';
import SecretaryInfo from '../../components/admin/SecretaryInfo';
import SecretaryDetail from '../../components/admin/SecretaryDetail';
import styles from './DoctorAccount.less';

let editHandler;
let delHandler;
let queryHandle;
let data;
let orglist;
const columns= [
  {
    title : '客服登录账号',
    dataIndex: 'loginName',
    key: 'loginName',
    width: 150,
  },
  {
    title:"姓名",
    dataIndex:"name",
    key:'name',
    width: 150,
  },
  {
    title:"电话",
    dataIndex:"tel",
    width: 200,
    key:"tel",
  },
  {
    title:"性别",
    dataIndex:"sex",
    key:'sex',
    width: 100,
    className: styles.center,
    render:(text,record)=>(text === "0" ? "男": '女')
  },
  {
    title:"年龄",
    dataIndex:"age",
    key:'age',
    width: 100,
    className: styles.center,
  },
  {
    title:"机构名称",
    dataIndex:"orgName",
    key:'orgName',
    width: 200,
  },
  {
    title:"操作",
    key:'option',
    render:(text,record) =>(
      <span>
        <SecretaryDetail record={record}>
            <a>查看</a><span className="ant-divider" />
        </SecretaryDetail>
        <SecretaryInfo record={record} onOk={editHandler} orglist = {orglist} orgList={data}>
            <a>修改</a><span className="ant-divider" />
        </SecretaryInfo>
        <Popconfirm title="确定要删除吗?"
                    onConfirm={delHandler.bind(null, record.secretaryId)}>
           <a href="">删除</a><span className="ant-divider" />
         </Popconfirm>
      </span>
    )
  }
]
const WorkerAccount = ({ loading, dispatch,adminModel}) => {

  const { pagination, list, total, orgList } = adminModel;

  const {list : dataSource} = list;

  //机构信息
  data = orgList;

  //确定添加
 /** createHandler = (data)=>{
    dispatch({
      type : 'adminModel/createSecretaryInfo',
      payload : data
    })
  }*/
  function createHandler(values){
   dispatch({
      type: "adminModel/createSecretaryInfo",
      payload: values,
    })
  };

  editHandler = (data) =>{
    dispatch({
      type: 'adminModel/editSecreInfo',
      payload: data
    })
  };
  //删除
   delHandler = (userId) =>{
    dispatch({
      type: 'adminModel/deleteSecreInfo',
      payload : userId
    })
  };

  orglist = () => {
    dispatch({
      type: 'adminModel/orgList'
    })
  };
  const handlerPageChange = (page) =>{

    dispatch({ type: 'adminModel/initSecretaryList', payload : page})
  }
  /**表格分页器*/
  const tablePagination = {
    total: total,
    current: pagination.page,
    pageSize: pagination.pageSize,
   // pageSize : 2,
    onChange: handlerPageChange,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
  };
  return(
    <div>
      <div className={styles.create}>
        <SecretaryInfo onOk = {createHandler} orglist = {orglist} orgList={data}>
          <Button type="primary" size="large">新增客服账号</Button>
        </SecretaryInfo>
      </div>


      <Table
        className={ styles.table }
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey={record=>record.secretaryId}
        pagination={tablePagination}
      />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    ...state,
    loading:false,
  };
};

export default connect(mapStateToProps)(WorkerAccount);
