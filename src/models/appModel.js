import {routerRedux} from 'dva/router';
import {getItemInfoById} from '../services/appService';
import {config, storeage, model, urlMap, action, fun, modular} from '../common';

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
		*checkLogin( { payload: { pathname, query } }, { select, put } ) {
			if ( pathname === '/login' || pathname === '/secretaryLogin' ) {
				return
			}
			let storeageUser = storeage.get( config.local.user );
			fun.print( storeageUser, '存储在浏览器内的user数据' );
			let currentUser = {};
			if ( pathname === '/orderList' || pathname === 'orderList' ) {
				if ( query.orderHandlerId ) {
					currentUser = query;
					currentUser.userType = config.userType.worker;
					storeage.set( config.local.user, currentUser );
					yield put( { type: action.app_init, payload: currentUser } );
				} else if ( storeageUser && storeageUser.userType === config.userType.worker ) {
					yield put( { type: action.app_init, payload: storeageUser } );
				} else {
					yield put( routerRedux.push( modular.secretaryLogin ) );
				}
			} else if ( pathname.indexOf( 'worker' ) > 0 ) {
				if ( storeageUser && storeageUser.userType === config.userType.worker ) {
					const workerModel = yield select( state => state.workerModel );
					if ( !workerModel ) {
						yield put( { type: action.app_init, payload: storeageUser } );
						yield put( routerRedux.push( modular.orderList.url ) );
					}
				} else {
					yield put( routerRedux.push( modular.secretaryLogin ) );
				}
			} else if ( storeageUser && storeageUser.userType === config.userType.doctor ) {
				yield put( { type: action.app_init, payload: storeageUser } );
			} else {
				yield put( routerRedux.push( modular.login ) );
			}
		},
		*logout( {}, { put } ) {
			storeage.set( config.local.user, null );
			yield put( routerRedux.push( urlMap.login ) );
		},
		*getItemPrice( { payload }, { call } ){
			const data = yield call( getItemInfoById, { itemId: payload.itemId } );
			if ( data.success ) {
				payload.fun( data.entity.itemMoney );
			} else {
				throw data
			}
		}
	},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( ( { pathname, query } ) => {
				dispatch( { type: action.checkLogin, payload: { pathname, query } } );
				// if ( pathname === '/orderList') {
				// 	if(query.orderHandlerId){
				// 		let user = { userType: config.userType.worker };
				// 		user = Object.assign( {}, user, query );
				// 		storeage.set( config.local.user, user );
				// 		dispatch( { type: action.app_init, payload: user } );
				// 	}
				// } else if ( pathname !== '/login' && pathname.indexOf( 'worker' ) < 0 ) {
				// 	dispatch( { type: action.checkLogin } );
				// }
			} )
		},
	},
};
