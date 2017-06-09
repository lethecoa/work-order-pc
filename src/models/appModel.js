import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { init } from '../services/appService';
import { storeage, print } from '../common';

export default {
  namespace: 'appModel',
  state: {
    user: {},
  },
  reducers: {
    init(state, { payload: user }) {
      return {
        ...state,
        user
      }
    }
  },
  effects: {
    *checkLogin({ payload }, { call, put }) {
      let user = storeage.get('user');
      print( user,'存储在浏览器内的user数据');
      if (user === null) {
        yield put(routerRedux.push('/login'));
      }
      else {
        yield put({ type: 'init', payload: user });
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'checkLogin' });
    }
  },
};
