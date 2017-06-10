import { routerRedux } from 'dva/router';
// import { } from '../services/appService';
import { config, storeage, model, urlMap, action, fun } from '../common';

export default {
  namespace: model.app,
  state: {
    user: {},
  },
  reducers: {
    init( state, { payload: user } ) {
      return {
        ...state, user
      }
    }
  },
  effects: {
    *checkLogin( { }, { call, put } ) {
      let user = storeage.get( config.local.user );
      fun.print( user, '存储在浏览器内的user数据' );
      if ( !user ) {
        yield put( routerRedux.push( urlMap.login ) );
      }
      else {
        yield put( { type: action.app_init, payload: user } );
      }
    },
    *logout( { }, { put } ) {
      storeage.set( config.local.user, null );
      yield put( routerRedux.push( urlMap.login ) );
    }
  },
  subscriptions: {
    setup( { dispatch } ) {
      dispatch( { type: action.checkLogin } );
    }
  },
};
