import {fun, model, action} from '../common';
import {savePolicy} from '../services/noticAgentService';

export default {
	namespace: model.noticeAgent,
	state: {},
	reducers: {},
	effects: {
		*savePolicy( { payload }, { call, put } ) {
			fun.print( payload, 'savePolicy', model.noticeAgent );
			const data = yield call( savePolicy, payload.data );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
	},
	subscriptions: {},
};
