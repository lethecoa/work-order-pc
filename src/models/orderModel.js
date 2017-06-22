import {action, model} from '../common';

export default {
	namespace: model.order,
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
		initState: ( state, { payload: { currentData } } ) => {
			console.log('===orderModel===initState===');
			return {
				currentStep: 0,
				display: 'none',
				disabled: false,
				displayConfirm: 'block',
				displayBack: 'block',
				displayNew: 'none',
				submitDisabled: false,
				reset:true,
				currentData,
			}
		},
		changeConfirmState: ( state ) => {
			console.log('===orderModel===changeConfirmStatet===');
			return {
				...state,
				currentStep: state.currentStep == 1 ? 0 : 1,
				display: state.display == 'none' ? 'block' : 'none',
				disabled: !state.disabled,
				displayConfirm: state.displayConfirm == 'none' ? 'block' : 'none',
			}
		},
		changeSubmitSate: ( state ) => {
			console.log('===orderModel===changeSubmitSatet===');
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
		*initDoctor( {}, { put, select } ){
			const currentData = yield select( state => state.appModel.user );
			yield put( {
				type: 'initState',
				payload: { currentData: currentData },
			} );
		}
	},
	subscriptions: {
		setup ( { dispatch, history } ) {
			history.listen( location => {
				dispatch( { type: action.order_init } );
			} )
		}
	},
};
