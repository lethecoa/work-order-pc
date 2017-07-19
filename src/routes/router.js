import React from 'react';
import {Router, Route} from 'dva/router';
import {urlMap, modular} from '../common';
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
					path: modular.signFamily.url,
					name: modular.signFamily.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.residentSign.url,
					name: modular.residentSign.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.residentInspect.url,
					name: modular.residentInspect.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.newborn.url,
					name: modular.newborn.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.postpartum.url,
					name: modular.postpartum.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/bookingAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.chronicDisease.url,
					name: modular.chronicDisease.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.newestPolicy.url,
					name: modular.newestPolicy.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.newestActivity.url,
					name: modular.newestActivity.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.antenatalCare.url,
					name: modular.antenatalCare.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.childHealth.url,
					name: modular.childHealth.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/noticeAgentModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.medication.url,
					name: modular.medication.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/trackingReminderModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.curativeEffect.url,
					name: modular.curativeEffect.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/trackingReminderModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.hypertension.url,
					name: modular.hypertension.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/chronicDiseaseModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.diabetes.url,
					name: modular.diabetes.name,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/chronicDiseaseModel' ) );
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
			]
		},
		{
			path: urlMap.login,
			name: 'Login',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel( app, require( '../models/loginModel' ) );
					cb( null, require( './Login/Login' ) );
				} );
			},
		},
		{
			path: modular.orderList.url,
			name: modular.orderList.name,
			indexRoute: {
				getComponent( nextState, cb ) {
					require.ensure( [], ( require ) => {
						registerModel( app, require( '../models/workerModel' ) );
						cb( null, require( './OrderList/OrderList' ) )
					} );
				},
			},
			childRoutes: [
				{
					path: modular.workeryyjmqy.url,
					name: modular.workeryyjmqy.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryyjmtj.url,
					name: modular.workeryyjmtj.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryyxsfs.url,
					name: modular.workeryyxsfs.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryychfs.url,
					name: modular.workeryychfs.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workermbsftz.url,
					name: modular.workermbsftz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workerzxzctz.url,
					name: modular.workerzxzctz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workerzxhdtz.url,
					name: modular.workerzxhdtz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryfcjtz.url,
					name: modular.workeryfcjtz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeretsftz.url,
					name: modular.workeretsftz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryytx00.url,
					name: modular.workeryytx00.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workeryylxgz.url,
					name: modular.workeryylxgz.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workergxysf0.url,
					name: modular.workergxysf0.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
				{
					path: modular.workertnbsf0.url,
					name: modular.workertnbsf0.url,
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							cb( null, require( './OrderPage/OrderPage' ) );
						} );
					},
				},
			]
		},
	];

	return <Router history={history} routes={routes}/>;
}

export default RouterConfig;