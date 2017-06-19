import {fun, model, action} from '../common';
import {saveChronic, savePolicy, saveActivity, saveGravida, saveChildren} from '../services/noticAgentService';

export default {
	namespace: model.noticeAgent,
	state: {},
	reducers: {},
	effects: {
		*saveChronic( { payload }, { call, put } ) {
			fun.print( payload, 'saveChronic', model.noticeAgent );
			const data = yield call( saveChronic, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*savePolicy( { payload }, { call, put } ) {
			fun.print( payload, 'savePolicy', model.noticeAgent );
			const data = yield call( savePolicy, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*saveActivity( { payload }, { call, put } ) {
			fun.print( payload, 'saveActivity', model.noticeAgent );
			const data = yield call( saveActivity, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*saveGravida( { payload }, { call, put } ) {
			fun.print( payload, 'saveGravida', model.noticeAgent );
			const data = yield call( saveGravida, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*saveChildren( { payload }, { call, put } ) {
			fun.print( payload, 'saveChildren', model.noticeAgent );
			const data = yield call( saveChildren, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
	},
	subscriptions: {},
};
