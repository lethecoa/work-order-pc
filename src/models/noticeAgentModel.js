import {model} from '../common';
export default {
	namespace: model.noticeAgent,
	state: {},
	reducers: {},
	effects: {
		*savePolicy( { payload }, { call, put } ) {
			let values = payload.data;
			values.taskDeadlineDate = values.taskDeadlineDate._d;
			values.amInterviewTimeStart = values.allowDate_am[ 0 ]._d;
			values.amInterviewTimeEnd = values.allowDate_am[ 1 ]._d;
			values.pmInterviewTimeStart = values.allowDate_pm[ 0 ]._d;
			values.pmInterviewTimeEnd = values.allowDate_pm[ 1 ]._d;
			delete(values[ "allowDate_am" ]);
			delete(values[ "allowDate_pm" ]);
			fun.print( payload, 'savePostpartum', model.bookingAgent );
			const data = yield call( savePostpartum, values );
			payload.fun( data );
			yield put( { type: action.BA_changeSubmitSate } );
		},
	},
	subscriptions: {},
};
