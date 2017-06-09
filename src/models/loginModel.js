import { routerRedux } from 'dva/router';
import { config, storeage, urlMap, model, action } from '../common';
import { login } from '../services/loginService';

export default {
  namespace: model.login,
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
    }
  },
  effects: {
    *login({ payload }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      if (config.debug && payload.telMobile === '0') {
        yield put(routerRedux.push(urlMap.index));
      }
      else {
        const data = yield call(login, payload);
        yield put({ type: 'hideLoginLoading' });
        if (data.success) {
          storeage.set(config.local.user, data.entity);
          yield put(routerRedux.push(urlMap.index));
        }
      }
    }
  },
  subscriptions: {},
};
