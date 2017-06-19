import {fun, model, action} from '../common';
import {saveChronic, savePolicy, saveActivity, saveGravida, saveChildren} from '../services/noticAgentService';

export default {
	namespace: model.noticeAgent,
	state: {},
	reducers: {},
	effects: {
		*saveChronic( { payload }, { call, put } ) {
			let values = payload.data;
			values.interviewItem = values.interviewItem.join( ',' );
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.interviewDateStart = values.allowDate[ 0 ];
			values.interviewDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( values, 'saveChronic', model.noticeAgent );
			const data = yield call( saveChronic, values );
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
			let values = payload.data;
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.activityDateStart = values.allowDate[ 0 ];
			values.activityDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveActivity', model.noticeAgent );
			const data = yield call( saveActivity, values );
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
