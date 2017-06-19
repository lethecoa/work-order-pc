import {fun, model, action} from '../common';
import {saveSign, savePhysicalExam, saveNewBorn, savePostpartum} from '../services/bookingAgentService';

export default {
	namespace: model.bookingAgent,
	state: {
		currentStep: 0,
		display: 'none',
		disabled: false,
		displayConfirm: 'block',
		displayBack: 'block',
		displayNew: 'none',
		submitDisabled: false,
	},
	reducers: {
		intiState: ( state ) => {
			console.log( '===bookingAgentModal_init===' );
			return {
				currentStep: 0,
				display: 'none',
				disabled: false,
				displayConfirm: 'block',
				displayBack: 'block',
				displayNew: 'none',
				submitDisabled: false,
			}
		},
		changeConfirmState: ( state ) => {
			return {
				...state,
				currentStep: state.currentStep == 1 ? 0 : 1,
				display: state.display == 'none' ? 'block' : 'none',
				disabled: !state.disabled,
				displayConfirm: state.displayConfirm == 'none' ? 'block' : 'none',
			}
		},
		changeSubmitSate: ( state ) => {
			return {
				...state,
				currentStep: 3,
				displayBack: 'none',
				displayNew: 'block',
				submitDisabled: true,
			}
		}
	},
	effects: {
		*saveSign( { payload }, { call, put } ) {
			let values = payload.data;
			values.carryMaterial = values.carryMaterial.join( ',' );
			values.agreementDateStart = values.allowDate[ 0 ];
			values.agreementDateEnd = values.allowDate[ 1 ];
			delete(values[ "allowDate" ]);
			fun.print( payload, 'saveSign', model.bookingAgent );
			const data = yield call( saveSign, values );
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
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
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
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
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
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
			payload.fun( data );
			yield put( { type: fun.fuse( model.order, action.order_changeSubmitSate ) } );
		},
	},
	subscriptions: {},
};
