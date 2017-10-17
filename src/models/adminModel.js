import {action,fun} from '../common';
import {queryAccountInfo,querySecretaryInfo,deletAccountInfo, updateAccountPersonInfo,
  createAccountInfo,createSecretaryInfo,updateSecretaryPersonInfo,deletSecretaryInfo,querySysOrgInfo}
  from '../services/adminService';

export default {
  namespace: 'adminModel',
  state: {
    pagination: {
      pageSize: 10,
      page: 1,
      status: "1",
      serverPackName: "0",
    },
    list : [],
    orgList:[],
    total : null,
    page : null,
  },
  reducers: {
     initAccount(state,{payload: {data : list, total, pagination}}){
      return {
        ...state, list, total, pagination}
    },

    org(state,{payload: orgList}){
      return {...state, orgList}
    },
  },

  effects: {
    //获取医生信息列表
    *initDoctorList({payload : page},{call,put,select}){
      const groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );
      const accountList = yield call( queryAccountInfo, {
        pageSize: pagination.pageSize,
        pageNo: page,
        groupId
      } );
      pagination.page = parseInt( page, 10 );
      pagination.groupId = groupId;
      if(accountList.success){
        let data = accountList.entity;
        yield put( {
          type: 'initAccount',
          payload: {
          data,
          total : parseInt(accountList.entity.total, 10),
           pagination
          }
        } );
      }else {
        fun.showNotification(accountList.message, "获取数据失败！", 'error');
      }
    },
    /**
     * 新增医生信息
     * @param data
     * @param call
     * @param put
     * @param select
     */
      *createDoctorInfo({payload:data},{call, put, select}){
      //从状态中获取组ID
      let groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );
      data.groupId = groupId;

      let result = yield call( createAccountInfo, data );
      if(result.success){
        fun.showNotification(result.entity, "恭喜您，添加医生账号成功！");
      }else {
        fun.showNotification(result.message, "添加失败！", 'error');
      }
      console.log('createDoctorInfo:',data);
      yield put({type:'initDoctorList', payload : pagination.page});
    },

    //修改医生信息
    *editDoctorInfo({payload:data},{call, put, select}){
      const groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );
      data.groupId = groupId;
      let result = yield call(updateAccountPersonInfo,data);
      if(result.success){
        fun.showNotification(result.entity,  '恭喜您，修改医生账号成功！');
      }else {
        fun.showNotification(result.message, '修改失败',  'error');
      }
      console.log('editDoctorInfo:',data);
      yield put({type:'initDoctorList', payload : pagination.page});
    },

    /**
     * 删除医生个人信息
     * @param call
     */
      *deleteDoctorInfo({payload: userId},{call, put, select}){
      //从状态中获取数据
      const result = yield call(deletAccountInfo,{userId});
      const pagination = yield select( state => state.adminModel.pagination );
      if(result.success){
        fun.showNotification(result.entity,'恭喜您，删除医生账号成功');
      }else {
        fun.showNotification(result.message, '删除失败', 'error');
      }
      console.log('deleteDoctorInfo: userId=',userId);
      yield put({type:'initDoctorList', payload : pagination.page});
    },
    /**
     * 获取客服信息列表
     * @param call
     * @param put
     * @param select
     */
      *initSecretaryList({payload : page},{call,put,select}){
      const adminId = yield select(state => state.appModel.user.adminId);
      const groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );

      let secretaryList = yield call(querySecretaryInfo,{
        adminId,
        groupId,
        pageSize : pagination.size,
        pageNo: page});
      pagination.page = parseInt( page, 10 );
      pagination.groupId = groupId;
      if(secretaryList.success){
        let data = secretaryList.entity;

        yield put({
          type : "initAccount",
          payload: {
            data,
            total : parseInt(secretaryList.entity.total, 10),
            pagination
          }
        });
      }else{
        fun.showNotification(secretaryList.message, "获取数据失败！", 'error');
      }
    },
    //添加客服信息数据处理
    *createSecretaryInfo({ payload: data},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );
      data.groupId = groupId;
      let result = yield call(createSecretaryInfo, data);

      if(result.success){
        fun.showNotification(result.entity,'恭喜您，添加客服账号成功');
      }else{
        fun.showNotification(result.message,'添加失败', 'error');
      }
      console.log('createSecretaryInfo:', data);
      yield put({type : 'initSecretaryList',payload : pagination.page}) ;
    },

    //修改客服个人信息
    *editSecreInfo({payload: data},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );
      data.groupId = groupId;
      let result = yield call(updateSecretaryPersonInfo, data);
      if(result.success){
        fun.showNotification(result.entity,'恭喜您，修改客服账号成功');
      }else{
        fun.showNotification(result.message,'修改失败', 'error');
      }
      console.log('editSecreInfo:', data);
      yield put({type : 'initSecretaryList', payload : pagination.page}) ;
    },

    //删除客服信息
    *deleteSecreInfo({payload: userId}, {call, put, select}){
      let result = yield call(deletSecretaryInfo, {userId});
      const pagination = yield select( state => state.adminModel.pagination );
      if(result.success){
        fun.showNotification(result.entity,'恭喜您，删除客服账号成功');
      }else{
        fun.showNotification(result.message,'删除失败','error');
      }
      console.log('deleteSecreInfo: userId= ', userId);
      yield put({type : 'initSecretaryList', payload : pagination.page}) ;
    },

    //获取机构信息列表
    *orgList({},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      let orgList = yield call(querySysOrgInfo,{groupId});

      let data = orgList.entity;
      if(orgList.success){
        yield put({
          type: 'org',
          payload: data
        })
      }else {
        fun.showNotification(orgList.entity, "获取数据失败！", 'error');
      }

    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if(pathname==='/admin/account/doctor'){
          dispatch({type: 'initDoctorList' });
        }else if(pathname === '/admin/account/worker'){
          dispatch({type : 'initSecretaryList'})
        }

      })
    },
  },
};
