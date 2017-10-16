import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Table,Pagination,Popconfirm,Button} from 'antd';
import {action, model, fun, modular,api} from '../../common';
import DoctorAccountModal from "../../components/admin/DoctorAccountModal";
import DoctorAccountDetail from "../../components/admin/DoctorAccountDetail";
import styles from './DoctorAccount.less';

let deleteDoctor;
let editDoctorInfo;
let createHandler;
let orglist;
let orgData;
let data;
const columns = [
  {
    title : '医生姓名',
    dataIndex: 'doctorName',
    key:'doctorName',
    width: 200,
  },
  {
    title:"医生电话",
    dataIndex:"doctorTel",
    key:'doctorTel',
    width: 200,
  },
  {
    title:"机构名称",
    dataIndex:"orgName",
    width: 200,
    key:"orgName",
  },

  {
    title:"是否禁用",
    dataIndex:"ifDisable",
    //key:'email',
    width: 100,
    className: styles.center,
    render:(text, record)=>(
      text === '1' ? '是' : '否'
    )
  },
  {
    title:"操作",
    key:"operation",
    render:(text,record) =>(
      <span>
         <DoctorAccountDetail record={record}>
            <a>查看 </a><span className="ant-divider" />
         </DoctorAccountDetail>
         <DoctorAccountModal record={record}  onOk={editDoctorInfo} orglist = {orglist} orgList={data}>
            <a>修改 </a><span className="ant-divider" />
         </DoctorAccountModal>
         <Popconfirm title="确定要删除吗?"
                     onConfirm={deleteDoctor.bind(null,record.accountId)}>
           <a href="">删除</a><span className="ant-divider" />
         </Popconfirm>
       </span>
    )
  }
]
const DoctorAccount = ({dispatch,loading, adminModel}) => {
  const { pagination, list : dataSource, total, orgList } = adminModel;
  data = orgList;

  /**删除医生信息*/
  deleteDoctor = (doctorId) => {
    dispatch({
      type: "adminModel/deleteDoctorInfo",
      payload: doctorId,
    })
  };

  createHandler = (data) => {
    dispatch({
      type: 'adminModel/createDoctorInfo',
      payload: data
    })
  };

  orglist = () => {
    dispatch({
      type: 'adminModel/orgList'
    })
  };

  //编辑医生信息
  editDoctorInfo = (values) => {
    dispatch({type: 'adminModel/editDoctorInfo', payload: values});
  };

  return (
    <div>
      <div className={styles.create}>
        <DoctorAccountModal  onOk={createHandler} orglist = {orglist} orgList={data}>
          <Button type="primary" size="large">新增医生账号</Button>
        </DoctorAccountModal>
      </div>
      <Table
        className={ styles.table }
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey={record=>record.accountId}
        pagination={false}

      />

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    loading:false,
  };
};
export default connect(mapStateToProps)(DoctorAccount);
