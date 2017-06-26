import {routerRedux} from 'dva/router';
import {fun, model, action, config, api} from '../common';
import {getOrders, getOrderDetail, saveService} from '../services/workerService';

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
	},
	reducers: {
		save( state, { payload: { list, total, pagination } } ) {
			console.log( '===workerModel===save===' );
			return { ...state, list, total, pagination };
		},
		saveCurrentOrder( state, { payload: { currentData, serviceDetail, residentList } } ) {
			console.log( '===workerModel===saveCurrentOrder===' );
			return { ...state, currentData, serviceDetail, residentList };
		},
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
			yield put( {
				type: 'saveCurrentOrder',
				payload: {
					currentData: order,
					serviceDetail: data.entity.serviceDetail,
					residentList: data.entity.residentList,
				},
			} );
			yield put( routerRedux.push( url ) );

		},
		*saveOrderDetail( { payload }, { call } ) {
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
				}
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