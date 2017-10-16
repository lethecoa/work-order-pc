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
    initAccount(state,{payload: list}){
      return {...state, list}
    },
    org(state,{payload: orgList}){
      return {...state, orgList}
    },
  },

  effects: {
    //获取医生信息列表
    *initDoctorList({},{call,put,select}){
      const groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );

      const data = yield call( queryAccountInfo, {groupId} );

      if(data.success){
        let list = data.entity;
        yield put( {
          type: 'initAccount',
          payload: list
        } );
      }else {
        fun.showNotification(data.message, "获取数据失败！", 'error');
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
      data.groupId = groupId;

      let result = yield call( createAccountInfo, data );
      if(result.success){
        fun.showNotification(result.entity, "恭喜您，添加医生账号成功！");
      }else {
        fun.showNotification(result.message, "添加失败！", 'error');
      }
      console.log('createDoctorInfo:',data);
      yield put({type:'initDoctorList'});
    },
    //修改医生信息
    *editDoctorInfo({payload:data},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      data.groupId = groupId;
      let result = yield call(updateAccountPersonInfo,data);
      if(result.success){
        fun.showNotification(result.entity,  '恭喜您，修改医生账号成功！');
      }else {
        fun.showNotification(result.message, '修改失败',  'error');
      }
      console.log('editDoctorInfo:',data);
      yield put({type:'initDoctorList'});
    },

    /**
     * 删除医生个人信息
     * @param call
     */
      *deleteDoctorInfo({payload: userId},{call, put}){
      //从状态中获取数据
      let result = yield call(deletAccountInfo,{userId});
      if(result.success){
        fun.showNotification(result.entity,'恭喜您，删除医生账号成功');
      }else {
        fun.showNotification(result.message, '删除失败', 'error');
      }
      console.log('deleteDoctorInfo: userId=',userId);
      yield put({type:'initDoctorList'});
    },
    /**
     * 获取客服信息列表
     * @param call
     * @param put
     * @param select
     */
      *initSecretaryList({},{call,put,select}){
      const adminId = yield select(state => state.appModel.user.adminId);
      const groupId = yield select(state => state.appModel.user.groupId);
      const pagination = yield select( state => state.adminModel.pagination );

      let data = yield call(querySecretaryInfo,{adminId,groupId});
      if(data.success){
        let list = data.entity;
        yield put({
          type : "initAccount",
          payload: list
        });
      }else{
        fun.showNotification(data.message, "获取数据失败！", 'error');
      }
    },
    //添加客服信息数据处理
    *createSecretaryInfo({ payload: data},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      data.groupId = groupId;
      let result = yield call(createSecretaryInfo, data);

      if(result.success){
        fun.showNotification(result.entity,'恭喜您，添加客服账号成功');
      }else{
        fun.showNotification(result.message,'添加失败', 'error');
      }
      console.log('createSecretaryInfo:', data);
      yield put({type : 'initSecretaryList'}) ;
    },

    //修改客服个人信息
    *editSecreInfo({payload: data},{call, put, select}){
      let groupId = yield select(state => state.appModel.user.groupId);
      data.groupId = groupId;
      let result = yield call(updateSecretaryPersonInfo, data);
      if(result.success){
        fun.showNotification(result.entity,'恭喜您，修改客服账号成功');
      }else{
        fun.showNotification(result.message,'修改失败', 'error');
      }
      console.log('editSecreInfo:', data);
      yield put({type : 'initSecretaryList'}) ;
    },

    //删除客服信息
    *deleteSecreInfo({payload: userId}, {call, put}){
        let result = yield call(deletSecretaryInfo, {userId});
        if(result.success){
          fun.showNotification(result.entity,'恭喜您，删除客服账号成功');
        }else{
          fun.showNotification(result.message,'删除失败','error');
        }
      console.log('deleteSecreInfo: userId= ', userId);
      yield put({type : 'initSecretaryList'}) ;
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
    //加载医生信息列表
    *reloadDoctor({},{call,put}){
      yield put({type:'initDoctorList'});
    },
    //加载客服信息列表
    *reloadSecretary({},{put}){
      yield put({type : 'initSecretaryList'}) ;
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
