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
			console.log( '===initState===' );
			return {
				currentStep: 0,
				display: 'none',
				disabled: false,
				displayConfirm: 'block',
				displayBack: 'block',
				displayNew: 'none',
				submitDisabled: false,
				currentData,
			}
		},
		initWorkerState: ( state, { payload: { currentData } } ) => {
			console.log( '===initWorkerState===' );
			return {
				display: 'block',
				disabled: true,
				currentData,
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
		*initWorker( {}, { put, select } ){
			const currentData = yield select( state => state.workerModel.currentData );
			yield put( {
				type: 'initWorkerState',
				payload: {
					currentData: currentData,
				},
			} );
		},
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
				if ( location.pathname.indexOf( 'worker' ) >= 0 ) {
					dispatch( { type: action.order_initWorker } );
				} else if ( location.pathname !== '/orderList' ) {
					dispatch( { type: action.order_init } );
				}
			} )
		}
	},
};
