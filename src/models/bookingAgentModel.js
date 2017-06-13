import {fun, model, action} from '../common';
import {saveSign} from '../services/bookingAgentService';
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
			values.taskDeadlineDate = values.taskDeadlineDate._d;
			values.agreementDateStart = values.allowDate[ 0 ]._d;
			values.agreementDateEnd = values.allowDate[ 1 ]._d;
			delete(values[ "allowDate" ]);
			fun.print( payload, 'onSubmit', model.bookingAgent );
			const data = yield call( saveSign, values );
			payload.fun( data );
			yield put( { type: action.BA_changeSubmitSate } );
		}
	},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( location => {
				if ( location.pathname === 'signFamily' ) {
					dispatch( { type: action.BA_init } );
				}
			} )
		}
	},
};
