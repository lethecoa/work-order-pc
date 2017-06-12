import {model} from '../common';
import {saveSign} from '../services/bookingAgentService';
export default {
	namespace: model.bookingAgent,
	state: {},
	reducers: {},
	effects: {
		*onSubmit( { payload }, { call } ) {
			delete(payload[ "allowDate" ]);
			const data = yield call( saveSign, payload );
			payload.fun( data );
		}
	},
	subscriptions: {},
};
