import { routerRedux } from 'dva/router';
import { parseUrl } from '../common/';

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
      const data = yield call(login, payload);
      yield put({ type: 'hideLoginLoading' });
      if (data.success) {
        const from = parseUrl('from');
        yield put({ type: '' });
      }
    }
  },
  subscriptions: {},
};
