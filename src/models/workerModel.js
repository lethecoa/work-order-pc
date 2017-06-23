import {routerRedux} from 'dva/router';
import {fun, model, action, config} from '../common';
import {getOrders, getOrderDetail, saveService} from '../services/workerService';

export default {
	namespace: model.worker,
	state: {
		pagination: {
			pageSize: 10,
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
		*getOrderDetail( { payload: { status = 1, order, url, orderId } }, { put, call, select } ){
			const currentData = order ? order : yield select( state => state.workerModel.currentData );
			const data = yield call( getOrderDetail, {
				orderId: order ? order.orderId : orderId,
			} );
			yield put( {
				type: 'saveCurrentOrder',
				payload: {
					currentData: currentData,
					serviceDetail: data.entity.serviceDetail,
					residentList: data.entity.residentList,
				},
			} );
			yield put( routerRedux.push( url ) );

		},
		*saveOrderDetail( { payload }, { call } ){
			fun.print( payload, 'saveOrderDetail', model.worker );
			const data = yield call( saveService, payload.data );
			if ( payload.type === 'submit' ) {
				fun.showResult( data, config.SUBMIT_INFO_SUCCESS, 'saveOrderDetail' );
			} else {
				fun.showResult( data, '', 'saveOrderDetail' );
			}
			if ( data.success ) {
				if ( payload.callBack ) {
					payload.callBack( payload.data.residentList[ 0 ].serviceId );
				}
			}
		}
	},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( ( { pathname, query } ) => {
				fun.print( query, 'query', model.worker );
				if ( pathname === '/orderList' ) {
					dispatch( { type: action.worker_getOrders, payload: query, } )
				}
			} )
		},
	},
};