import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { init } from '../services/appService';
import { storeage } from '../common';

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
      console.log('>>>user:', user);
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
