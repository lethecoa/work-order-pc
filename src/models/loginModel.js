import { routerRedux } from 'dva/router';
import { config, storeage, urlMap, model, action, fun } from '../common';
import { login } from '../services/loginService';

export default {
  namespace: model.login,
  state: {
    loginInfo: storeage.get( config.local.loginInfo ) || {},
  },
  reducers: {
    setInfo: ( state, { payload: loginInfo } ) => {
      return {
        ...state, loginInfo
      }
    }
  },
  effects: {
    *init( { }, { put } ) {
      let info = storeage.get( config.local.loginInfo );
      yield put( { type: action.login_setInfo, payload: info } );
    },
    *login( { payload }, { put, call } ) {
      // 测试模式并且手机号输入0，直接进入主页
      if ( config.debug && payload.telMobile === '0' ) {
        yield put( routerRedux.push( urlMap.index ) );
      }
      else {
        const data = yield call( login, payload );
        if ( data.success ) {
          // 存储登录数据到浏览器内
          payload.password = '';
          if ( payload.remember ) {
            yield put( { type: action.login_setInfo, payload: payload } );
            storeage.set( config.local.loginInfo, payload );
          } else {
            yield put( { type: action.login_setInfo, payload: {} } );
            storeage.set( config.local.loginInfo, null );
          }

          storeage.set( config.local.user, data.entity );
          yield put( routerRedux.push( urlMap.index ) );
        }
      }
    }
  },
  subscriptions: {
    setup( { dispatch } ) {
    }
  },
};
