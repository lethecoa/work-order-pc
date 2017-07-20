import {routerRedux} from 'dva/router';
import {config, storeage, urlMap, model, action, fun, modular} from '../common';
import {login, secretaryLogin} from '../services/loginService';

export default {
	namespace: model.login,
	state: {
		loginInfo: storeage.get( config.local.loginInfo ) || {},
	},
	reducers: {
		setInfo: ( state, { payload: loginInfo } ) => {
			console.log( '===loginModel===setInfo===' );
			return {
				...state, loginInfo
			}
		}
	},
	effects: {
		*init( {}, { put } ) {
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
					let user = data.entity;
					user.userType = config.userType.doctor;
					storeage.set( config.local.user, user );
					yield put( { type: fun.fuse( model.app, action.app_init ), payload: user } );
					yield put( routerRedux.push( urlMap.index ) );
				} else {
					fun.showNotification( data.message, "登录失败！", 'error' );
				}
			}
		},
		*secretaryLogin( { payload }, { put, call } ){
			const data = yield call( secretaryLogin, payload );
			if ( data.success ) {
				let user = {};
				user.userType = config.userType.worker;
				user.orderHandlerId = data.entity.secretaryId;
				user.orderHandlerName = data.entity.name;
				user.groupId = data.entity.groupId;
				storeage.set( config.local.user, user );
				yield put( { type: fun.fuse( model.app, action.app_init ), payload: user } );
				yield put( routerRedux.push( modular.orderList.url ) );
			} else {
				fun.showNotification( data.message, "登录失败！", 'error' );
			}
		}
	},
	subscriptions: {},
};
