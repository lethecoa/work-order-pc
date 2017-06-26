import {fun, model, action, api} from '../common';
import {saveBlood, saveSugar} from '../services/chronicDiseaseService';

export default {
	namespace: model.chronicDisease,
	state: {},
	reducers: {},
	effects: {
		*saveBlood( { payload }, { call, put } ) {
			fun.print( payload, 'saveBlood', model.chronicDisease );
			const data = yield call( saveBlood, payload.data );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: payload.data, apiName: api.saveBlood }
			} );
		},
		*saveSugar( { payload }, { call, put } ) {
			fun.print( payload, 'saveSugar', model.chronicDisease );
			const data = yield call( saveSugar, payload.data );
			yield put( {
				type: fun.fuse( model.order, action.order_submitCallBack ),
				payload: { fun: payload.fun, responsData: data, requestData: payload.data, apiName: api.saveSugar }
			} );
		},
	},
	subscriptions: {},
};
