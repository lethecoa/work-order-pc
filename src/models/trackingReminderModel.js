import {fun, model, action} from '../common';
import {saveDrug, saveDrugeffect} from '../services/trackingReminderService';

export default {
	namespace: model.trackingReminder,
	state: {},
	reducers: {},
	effects: {
		*saveDrug( { payload }, { call, put } ) {
			fun.print( payload, 'saveDrug', model.trackingReminder );
			const data = yield call( saveDrug, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*saveDrugeffect( { payload }, { call, put } ) {
			fun.print( payload, 'saveDrugeffect', model.trackingReminder );
			const data = yield call( saveDrugeffect, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
	},
	subscriptions: {},
};
