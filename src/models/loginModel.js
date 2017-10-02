import {routerRedux} from 'dva/router';
import {config, storeage, urlMap, model, action, fun, modular} from '../common';
import {login, secretaryLogin, adminLogin} from '../services/loginService';

export default {
  namespace: model.login,
  state: {
    loginInfo: storeage.get(config.local.loginInfo) || {},
  },
  reducers: {
    setInfo: (state, {payload: loginInfo}) => {
      console.log('===loginModel===setInfo===');
      return {
        ...state, loginInfo
      }
    }
  },
  effects: {
    * login({payload}, {put, call, select}) {
      const userType = yield select(state => state.appModel.userType);
      let path = '';
      let data = {};
      if (userType === config.userType.worker) {
        data = yield call(secretaryLogin, payload);
        path = modular.unfinished.url;
      } else if (userType === config.userType.admin) {
        data = yield call(adminLogin, payload);
        path = modular.doctorAccount.url;
      } else {
        data = yield call(login, payload);
        path = modular.index.url;
      }
      if (data.success) {
        // 存储登录数据到浏览器内
        payload.password = '';
        if (payload.remember) {
          yield put({type: action.login_setInfo, payload: payload});
          storeage.set(config.local.loginInfo, payload);
        } else {
          yield put({type: action.login_setInfo, payload: {}});
          storeage.set(config.local.loginInfo, null);
        }
        let user = data.entity;
        user.userType = userType;
        storeage.set(config.local.user, user);
        storeage.set(config.local.userType, userType);
        yield put({type: fun.fuse(model.app, action.app_init), payload: user});
        yield put(routerRedux.push(path));
      } else {
        fun.showNotification(data.message, "登录失败！", 'error');
      }
    },
  },
  subscriptions: {},
};
