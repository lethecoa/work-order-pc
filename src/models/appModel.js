import {routerRedux} from 'dva/router';
import pathToRegexp from 'path-to-regexp'
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
		},
		initWithPath( state, { payload: { user, path } } ) {
			return {
				...state, user, path
			}
		},
		saveUserType: ( state, { payload: userType } ) => {
			return {
				...state, userType
			}
		}
	},






	effects: {
		*checkLogin( { payload: { pathname, query } }, { select, put } ) {
			const matchDoctor = pathToRegexp( '/doctor/:modelName/:subPath' ).exec( pathname );
			const matchWorker = pathToRegexp( '/worker/:state/:subPath' ).exec( pathname );
			let storeageUser = storeage.get( config.local.user );
			let storeageUserType = storeage.get( config.local.userType );
			fun.print( storeageUser, '存储在浏览器内的user数据' );
			let currentUser = {};
			if ( matchWorker && matchWorker[ 1 ] === 'orderList' ) {
				if ( query.secretaryId ) {
					currentUser = query;
					currentUser.userType = config.userType.worker;
					storeage.set( config.local.user, currentUser );
					yield put( { type: action.app_initWithPath, payload: { user: currentUser, path: matchWorker[ 2 ] } } );
				} else if ( storeageUser && storeageUser.userType === config.userType.worker ) {
					yield put( { type: action.app_initWithPath, payload: { user: storeageUser, path: matchWorker[ 2 ] } } );
				} else {
					yield put( { type: action.app_saveUserType, payload: config.userType.worker } );
					yield put( routerRedux.push( modular.login ) );
				}
			} else if ( matchWorker ) {
				if ( storeageUser && storeageUser.userType === config.userType.worker ) {
					const workerModel = yield select( state => state.workerModel );
					if ( !workerModel ) {
						yield put( { type: action.app_init, payload: storeageUser } );
						if ( matchWorker[ 1 ] === 'unfinished' ) {
							yield put( routerRedux.push( modular.unfinished.url ) );
						} else {
							yield put( routerRedux.push( modular.finish.url ) );
						}
					} else {
						yield put( { type: action.app_initWithPath, payload: { user: storeageUser, path: matchWorker[ 2 ] } } );
					}
				} else {
					yield put( { type: action.app_saveUserType, payload: config.userType.worker } );
					yield put( routerRedux.push( modular.login ) );
				}
			} else if ( matchDoctor ) {
				if ( storeageUser && storeageUser.userType === config.userType.doctor ) {
					yield put( { type: action.app_initWithPath, payload: { user: storeageUser, path: matchDoctor[ 2 ] } } );
				} else {
					yield put( { type: action.app_saveUserType, payload: config.userType.doctor } );
					yield put( routerRedux.push( modular.login ) );
				}
			} else if ( pathname === '/' ) {
				if ( storeageUser && storeageUser.userType === config.userType.doctor ) {
					yield put( { type: action.app_init, payload: storeageUser } );
				} else {
					yield put( { type: action.app_saveUserType, payload: config.userType.doctor } );
					yield put( routerRedux.push( modular.login ) );
				}
			} else if ( pathname === '/login' ) {
				const userType = yield select( state => state.appModel.userType );
				if ( !userType ) {
					if ( storeageUserType ) {
						yield put( { type: action.app_saveUserType, payload: storeageUserType } );
					} else {
						yield put( { type: action.app_saveUserType, payload: config.userType.doctor } );
					}
				}
			} else {
				yield put( routerRedux.push( modular.login ) );
			}
		},
		*logout( {}, { put } ) {
			storeage.set( config.local.user, null );
			yield put( routerRedux.push( modular.login ) );
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
