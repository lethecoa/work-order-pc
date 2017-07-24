import {routerRedux} from 'dva/router';
import pathToRegexp from 'path-to-regexp'
import {fun, model, action, config, api, modular} from '../common';
import {getOrders, getOrderDetail, saveService, confirmOrder} from '../services/workerService';
import Promise from 'bluebird';

export default {
	namespace: model.worker,
	state: {
		pagination: {
			pageSize: 10,
			page: 1,
			status: "1",
			serverPackName: "0",
		},
		display: 'block',
		disabled: true,
		disabledConfirmOrder: false,
		isOver: false,
	},
	reducers: {
		save( state, { payload: { list, total, pagination } } ) {
			/*console.log( '===workerModel===save===' );*/
			return { ...state, list, total, pagination };
		},
		saveCurrentOrder( state, { payload: { currentData, serviceDetail, residentList, disabledConfirmOrder, count, isOver } } ) {
			/*console.log( '===workerModel===saveCurrentOrder===' );*/
			return { ...state, currentData, serviceDetail, residentList, disabledConfirmOrder, count, isOver };
		},
		changeBtnDisabled( state, { payload } ){
			return { ...state, disabledConfirmOrder: payload }
		},
		changeCount( state, { payload } ){
			return { ...state, count: payload }
		},
		changeIsOver( state, { payload } ){
			return { ...state, isOver: payload }
		}
	},
	effects: {
		*initOrderList( { payload: { status, page = 1 } }, { put, select, call } ) {
			const pagination = yield select( state => state.workerModel.pagination );
			const groupId = yield select( state => state.appModel.user.groupId );
			const data = yield call( getOrders, {
				dateStart: pagination.dateStart,
				dateEnd: pagination.dateEnd,
				pageSize: pagination.pageSize,
				serverPackName: pagination.serverPackName,
				pageNumber: page,
				status: status,
				groupId,
			} );
			pagination.page = parseInt( page, 10 );
			pagination.groupId = groupId;
			pagination.status = status;
			// pagination.serverPackName = "0";
			// pagination.dateStart = undefined;
			// pagination.dateEnd = undefined;

			yield put( {
				type: 'save',
				payload: {
					list: data.entity.rows,
					total: parseInt( data.entity.total, 10 ),
					pagination,
				},
			} );
		},
		*getOrders( { payload: { page = 1, serverPackName = "0", dateStart = undefined, dateEnd = undefined } }, { call, put, select } ) {
			const pagination = yield select( state => state.workerModel.pagination );
			const data = yield call( getOrders, {
				dateStart: dateStart,
				dateEnd: dateEnd,
				pageSize: pagination.pageSize,
				serverPackName: serverPackName,
				pageNumber: page,
				status: pagination.status,
				groupId: pagination.groupId,
			} );
			pagination.page = parseInt( page, 10 );
			pagination.serverPackName = serverPackName;
			pagination.dateStart = dateStart;
			pagination.dateEnd = dateEnd;
			yield put( {
				type: 'save',
				payload: {
					list: data.entity.rows,
					total: parseInt( data.entity.total, 10 ),
					pagination: pagination,
				},
			} );
		},
		*getOrderDetail( { payload: { order, url } }, { put, call } ) {
			const data = yield call( getOrderDetail, {
				orderId: order.orderId,
			} );
			let count = data.entity.residentList.filter( item => item.status === '1' ).length;
			yield put( {
				type: 'saveCurrentOrder',
				payload: {
					currentData: order,
					serviceDetail: data.entity.serviceDetail,
					residentList: data.entity.residentList,
					disabledConfirmOrder: !!count,
					count: count,
					isOver: data.entity.order.orderStatus === '2',
				},
			} );
			yield put( routerRedux.push( url ) );
		},
		*saveOrderDetail( { payload }, { call, put, select } ) {
			fun.print( JSON.stringify( payload.data ), 'saveOrderDetail', model.worker );
			const data = yield call( saveService, payload.data );
			if ( payload.type === 'submit' ) {
				let msg = config.SUBMIT_INFO_SUCCESS;
				if ( payload.data.residentList[ 0 ].status === '1' ) {
					msg = config.REVOKE_INFO_SUCCESS;
				}
				fun.showResult( {
					responsData: data,
					requestData: payload.data,
					apiName: api.saveService,
				}, msg );
			} else {
				fun.showResult( {
						responsData: data,
						requestData: payload.data,
						apiName: api.saveService,
					}
				);
			}
			if ( data.success ) {
				if ( payload.callBack ) {
					payload.callBack( payload.data.residentList[ 0 ].serviceId );
					let count = yield select( state => state.workerModel.count );
					if ( payload.data.residentList[ 0 ].status === '1' ) {
						yield put( { type: 'changeCount', payload: ++count } )
					} else {
						yield put( { type: 'changeCount', payload: --count } )
					}
					if ( count ) {
						yield put( { type: 'changeBtnDisabled', payload: true } )
					} else {
						yield put( { type: 'changeBtnDisabled', payload: false } )
					}
				}
			}
		},
		*confirmOrder( { payload }, { call, put } ){
			fun.print( JSON.stringify( payload ), 'confirmOrder', model.worker );
			const data = yield call( confirmOrder, payload );
			fun.showResult( {
				responsData: data,
				requestData: payload,
				apiName: api.confirmOrder,
			}, config.CONFIRM_ORDER_SUCCESS );
			if ( data.success ) {
				yield put( { type: 'changeBtnDisabled', payload: true } );
				yield put( { type: 'changeIsOver', payload: true } );
				yield Promise.delay( 2000 );
				yield put( routerRedux.push( modular.unfinished.url ) );
			}
		}
	},
	subscriptions: {
		setup( { dispatch, history } ) {
			history.listen( ( { pathname, query } ) => {
				const matchWorker = pathToRegexp( '/worker/:state/:subPath' ).exec( pathname );
				if ( matchWorker && matchWorker[ 1 ] === 'orderList' ) {
					const status = matchWorker[ 2 ] === 'unfinished' ? '1' : '2';
					dispatch( { type: action.worker_initOrderList, payload: { status, page: query.page } } )
				}
			} )
		},
	},
};