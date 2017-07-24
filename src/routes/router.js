import {Router} from 'dva/router';
import {modular} from '../common';
import App from './App'

const cached = {};
function registerModel( app, model ) {
	if ( !cached[ model.namespace ] ) {
		app.model( model );
		cached[ model.namespace ] = 1;
	}
}

function RouterConfig( { history, app } ) {
	const routes = [
		{
			path: modular.index.url,
			name: modular.index.name,
			component: App,
			indexRoute: {
				getComponent( nextState, cb ) {
					require.ensure( [], ( require ) => {
						cb( null, require( './IndexPage/IndexPage' ) )
					} );
				},
			},
			childRoutes: [
				{
					path: 'doctor/bookingAgent/:subPath',
					name: 'bookingAgent',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: 'doctor/noticeAgent/:subPath',
					name: 'noticeAgent',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: 'doctor/trackingReminder/:subPath',
					name: 'trackingReminder',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/trackingReminderModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: 'doctor/chronicDisease/:subPath',
					name: 'chronicDisease',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/chronicDiseaseModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: '/worker/orderList/:state',
					name: 'orderList',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/workerModel' ) );
							cb( null, require( './OrderList/OrderList' ) )
						} );
					},
				},
				{
					path: '/worker/:state/:subPath',
					name: 'workerPage',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
			]
		},
		{
			path: modular.login,
			name: 'Login',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel( app, require( '../models/loginModel' ) );
					cb( null, require( './Login/Login' ) );
				} );
			},
		},
		{
			path: '*',
			name: 'other',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel( app, require( '../models/loginModel' ) );
					cb( null, require( './Login/Login' ) );
				} );
			},
		},
	];

	return <Router history={history} routes={routes}/>;
}

export default RouterConfig;