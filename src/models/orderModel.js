import {action, model} from '../common';

export default {
	namespace: model.orderModel,
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
		initState: ( state ) => {
			console.log( '===orderModal_init===' );
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
	effects: {},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( location => {
				if ( location.pathname.indexOf( 'order' ) < 0 ) {
					dispatch( { type: action.order_init } );
				}
			} )
		}
	},
};
