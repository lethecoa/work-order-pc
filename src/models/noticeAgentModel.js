import {fun, model, action, api} from '../common';
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
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveChronic }
			} );
		},
		*savePolicy( { payload }, { call, put } ) {
			fun.print( payload, 'savePolicy', model.noticeAgent );
			const data = yield call( savePolicy, payload.data );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: payload.data, apiName: api.savePolicy }
			} );
		},
		*saveActivity( { payload }, { call, put } ) {
			let values = payload.data;
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.activityDateStart = values.allowDate[ 0 ];
			values.activityDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveActivity', model.noticeAgent );
			const data = yield call( saveActivity, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveActivity }
			} );
		},
		*saveGravida( { payload }, { call, put } ) {
			let values = payload.data;
			values.antenatalCareItem = values.antenatalCareItem.join( ',' );
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.antenatalCareDateStart = values.allowDate[ 0 ];
			values.antenatalCareDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveGravida', model.noticeAgent );
			const data = yield call( saveGravida, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveGravida }
			} );
		},
		*saveChildren( { payload }, { call, put } ) {
			let values = payload.data;
			values.interviewDateStart = values.allowDate[ 0 ];
			values.interviewDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveChildren', model.noticeAgent );
			const data = yield call( saveChildren, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveChildren }
			} );
		},
	},
	subscriptions: {},
};
