import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { init } from '../services/appService';
import { storeage } from '../common';

export default {
  namespace: 'appModel',
  state: {
    user: storeage.get('user') || {},
  },
  reducers: {
    initSuccess(state, { payload: user }) {
      return {
        ...state,
        user
      }
    }
  },
  effects: {
    *init({ payload }, { call, put }) {
      const data = yield call(init, parse(payload));
      if (data.success && data.user) {
        yield put({ type: 'initSuccess', payload: data.user });

      }
    },
    *checkLogin({ payload }, { call, put }) {
      let user = storeage.get('user');
      console.log(user);
      if (user === null) {
        yield put(routerRedux.push('/login'));
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'checkLogin' });
    }
  },
};
