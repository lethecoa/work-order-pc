import {fun, model, action} from '../common';
import {getOrders} from '../services/workerService';

export default {
	namespace: model.worker,
	state: {
		pageSize: 10,
	},
	reducers: {
		save( state, { payload: { data: list, total, page } } ) {
			return { ...state, list, total, page };
		},
	},
	effects: {
		*getOrders( { payload: { page = 1, status = 1, serverPackName = 0, dateStart = null, dateEnd = null } }, { call, put, select } ) {
			const pageSize = yield select( state => state.workerModel.pageSize );
			const data = yield call( getOrders, {
				dateStart: dateStart,
				dateEnd: dateEnd,
				pageSize: pageSize,
				serverPackName: serverPackName,
				pageNumber: page,
				status: status
			} );
			console.log( data );
			yield put( {
				type: 'save',
				payload: {
					data: data.entity.rows,
					total: parseInt( data.entity.total, 10 ),
					page: parseInt( page, 10 ),
				},
			} );
		},
		*pageChange( { payload: { page = 1 } } ){

		},
	},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( ( { pathname, query } ) => {
				fun.print( query, 'query', model.worker );
				if ( pathname === '/orderList' ) {
					dispatch( { type: action.OL_getOrders, payload: query, } )
				}
			} )
		},
	},
};