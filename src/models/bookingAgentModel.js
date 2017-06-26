import {fun, model, action, api} from '../common';
import {saveSign, savePhysicalExam, saveNewBorn, savePostpartum} from '../services/bookingAgentService';

export default {
	namespace: model.bookingAgent,
	state: {},
	reducers: {},
	effects: {
		*saveSign( { payload }, { call, put } ) {
			let values = payload.data;
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.agreementDateStart = values.allowDate[ 0 ];
			values.agreementDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveSign', model.bookingAgent );
			const data = yield call( saveSign, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveSign }
			} );
		},
		*savePhysicalExam( { payload }, { call, put } ) {
			let values = payload.data;
			values.examineItem = values.examineItem.join( ',' );
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.examineDateStart = values.allowDate[ 0 ];
			values.examineDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'savePhysicalExam', model.bookingAgent );
			const data = yield call( savePhysicalExam, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.savePhysicalExam }
			} );
		},
		*saveNewBorn( { payload }, { call, put } ) {
			let values = payload.data;
			values.amInterviewTimeStart = values.allowDate_am[ 0 ];
			values.amInterviewTimeEnd = values.allowDate_am[ 1 ];
			values.pmInterviewTimeStart = values.allowDate_pm[ 0 ];
			values.pmInterviewTimeEnd = values.allowDate_pm[ 1 ];
			delete(values[ "allowDate_am" ]);
			delete(values[ "allowDate_pm" ]);
			fun.print( payload, 'saveNewBorn', model.bookingAgent );
			const data = yield call( saveNewBorn, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.saveNewBorn }
			} );
		},
		*savePostpartum( { payload }, { call, put } ) {
			let values = payload.data;
			values.amInterviewTimeStart = values.allowDate_am[ 0 ];
			values.amInterviewTimeEnd = values.allowDate_am[ 1 ];
			values.pmInterviewTimeStart = values.allowDate_pm[ 0 ];
			values.pmInterviewTimeEnd = values.allowDate_pm[ 1 ];
			delete(values[ "allowDate_am" ]);
			delete(values[ "allowDate_pm" ]);
			fun.print( payload, 'savePostpartum', model.bookingAgent );
			const data = yield call( savePostpartum, values );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: values, apiName: api.savePostpartum }
			} );
		},
	},
	subscriptions: {},
};
