import { routerRedux } from 'dva/router';
import { parseUrl } from '../common/';
import { login } from '../services/loginService';

export default {
  namespace: 'loginModel',
  state: {
    loginLoading: false,
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
  effects: {
    *login({ payload }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      console.log('login:login1: ', payload);
      const data = yield call(login, payload);
      yield put({ type: 'hideLoginLoading' });
      console.log('login:login2: ', data);
      if (data.success) {
        const from = parseUrl('from');
        yield put({ type: '' });
      }
    }
  },
  subscriptions: {},
};
