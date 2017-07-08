import {action, model, fun, config} from '../common';

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
			console.log( '===orderModel===initState===' );
			return {
				currentStep: 0,
				display: 'none',
				disabled: false,
				displayConfirm: 'block',
				displayBack: 'block',
				displayNew: 'none',
				submitDisabled: false,
				currentData,
				residentList: [],
			}
		},
		saveResidentList: ( state, { payload: { residentList } } ) => {
			console.log( '===orderModel===saveResidentList===' );
			return {
				...state,
				residentList,
			}
		},
		changeConfirmState: ( state ) => {
			console.log( '===orderModel===changeConfirmStatet===' );
			return {
				...state,
				currentStep: state.currentStep == 1 ? 0 : 1,
				display: state.display == 'none' ? 'block' : 'none',
				disabled: !state.disabled,
				displayConfirm: state.displayConfirm == 'none' ? 'block' : 'none',
			}
		},
		changeSubmitSate: ( state ) => {
			console.log( '===orderModel===changeSubmitSatet===' );
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
		},
		*submitCallBack( { payload }, { put } ){
			payload.fun();
			fun.showResult( payload, config.SUBMIT_SUCCESS );
			yield put( { type: 'changeSubmitSate' } );
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
