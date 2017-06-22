import {routerRedux} from 'dva/router';
import {getItemInfoById} from '../services/appService';
import {config, storeage, model, urlMap, action, fun} from '../common';

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
		*checkLogin( {}, { select, put } ) {
			let user = storeage.get( config.local.user );
			fun.print( user, '存储在浏览器内的user数据' );
			if ( user && user.userType === config.userType.doctor ) {
				const stateUser = yield select( state => state.appModel.user );
				if ( !stateUser || fun.isEmptyObject( stateUser ) ) {
					yield put( { type: action.app_init, payload: user } );
				}
			}
			else {
				yield put( routerRedux.push( urlMap.login ) );
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
				if ( pathname === '/orderList') {
					if(query.orderHandlerId){
						let user = { userType: config.userType.worker };
						user = Object.assign( {}, user, query );
						storeage.set( config.local.user, user );
						dispatch( { type: action.app_init, payload: user } );
					}
				} else if ( pathname !== '/login' && pathname.indexOf( 'worker' ) < 0 ) {
					dispatch( { type: action.checkLogin } );
				}
			} )
		},
	},
};
