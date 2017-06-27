import {routerRedux} from 'dva/router';
import {fun, model, action, config, api} from '../common';
import {getOrders, getOrderDetail, saveService, confirmOrder} from '../services/workerService';

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
	},
	reducers: {
		save( state, { payload: { list, total, pagination } } ) {
			/*console.log( '===workerModel===save===' );*/
			return { ...state, list, total, pagination };
		},
		saveCurrentOrder( state, { payload: { currentData, serviceDetail, residentList, disabledConfirmOrder, count } } ) {
			/*console.log( '===workerModel===saveCurrentOrder===' );*/
			return { ...state, currentData, serviceDetail, residentList, disabledConfirmOrder, count };
		},
		changeBtnDisabled( state, { payload } ){
			return { ...state, disabledConfirmOrder: payload }
		},
		changeCount( state, { payload } ){
			return { ...state, count: payload }
		}
	},
	effects: {
		*initOrderList( {}, { put, select, call } ) {
			const pagination = yield select( state => state.workerModel.pagination );
			const data = yield call( getOrders, {
				dateStart: pagination.dateStart,
				dateEnd: pagination.dateEnd,
				pageSize: pagination.pageSize,
				serverPackName: pagination.serverPackName,
				pageNumber: pagination.page,
				status: pagination.status
			} );
			yield put( {
				type: 'save',
				payload: {
					list: data.entity.rows,
					total: parseInt( data.entity.total, 10 ),
					pagination,
				},
			} );
		},
		*getOrders( { payload: { page = 1, status = "1", serverPackName = "0", dateStart = undefined, dateEnd = undefined } }, { call, put, select } ) {
			const pagination = yield select( state => state.workerModel.pagination );
			const data = yield call( getOrders, {
				dateStart: dateStart,
				dateEnd: dateEnd,
				pageSize: pagination.pageSize,
				serverPackName: serverPackName,
				pageNumber: page,
				status: status
			} );
			pagination.page = parseInt( page, 10 );
			pagination.status = status;
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
			}
		}
	},
	subscriptions: {
		setup( { dispatch, history } ) {
			history.listen( ( { pathname } ) => {
				if ( pathname === '/orderList' ) {
					dispatch( { type: action.worker_initOrderList } )
				}
			} )
		},
	},
};