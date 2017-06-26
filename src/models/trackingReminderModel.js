import {fun, model, action, api} from '../common';
import {saveDrug, saveDrugeffect} from '../services/trackingReminderService';

export default {
	namespace: model.trackingReminder,
	state: {},
	reducers: {},
	effects: {
		*saveDrug( { payload }, { call, put } ) {
			fun.print( payload, 'saveDrug', model.trackingReminder );
			const data = yield call( saveDrug, payload.data );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: payload.data, apiName: api.saveDrug }
			} );
		},
		*saveDrugeffect( { payload }, { call, put } ) {
			fun.print( payload, 'saveDrugeffect', model.trackingReminder );
			const data = yield call( saveDrugeffect, payload.data );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: payload.data, apiName: api.saveDrugeffect }
			} );
		},
	},
	subscriptions: {},
};
