import {fun, model, action} from '../common';
import {saveBlood, saveSugar} from '../services/chronicDiseaseService';

export default {
	namespace: model.chronicDisease,
	state: {},
	reducers: {},
	effects: {
		*saveBlood( { payload }, { call, put } ) {
			fun.print( payload, 'saveBlood', model.chronicDisease );
			const data = yield call( saveBlood, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
		*saveSugar( { payload }, { call, put } ) {
			fun.print( payload, 'saveSugar', model.chronicDisease );
			const data = yield call( saveSugar, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
	},
	subscriptions: {},
};
