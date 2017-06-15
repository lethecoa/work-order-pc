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
							cb( null, require( './SignFamily/SignFamily' ) );
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
							cb( null, require( './BookingAgent/ResidentSign' ) );
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
							cb( null, require( './BookingAgent/ResidentInspect' ) );
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
							cb( null, require( './BookingAgent/Newborn' ) );
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
							cb( null, require( './BookingAgent/Postpartum' ) );
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
							cb( null, require( './NoticeAgent/ChronicDisease' ) );
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
							cb( null, require( './NoticeAgent/NewestPolicy' ) );
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
							cb( null, require( './NoticeAgent/NewestActivity' ) );
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
							cb( null, require( './NoticeAgent/AntenatalCare' ) );
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
							cb( null, require( './NoticeAgent/ChildHealth' ) );
						} );
					},
				},
				{
					path: urlMap.medication,
					name: 'Medication',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/trackingReminderModel' ) );
							cb( null, require( './TrackingReminder/Medication' ) );
						} );
					},
				},
				{
					path: urlMap.curativeEffect,
					name: 'CurativeEffect',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/trackingReminderModel' ) );
							cb( null, require( './TrackingReminder/CurativeEffect' ) );
						} );
					},
				},
				{
					path: urlMap.hypertension,
					name: 'Hypertension',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/chronicDiseaseModel' ) );
							cb( null, require( './ChronicDisease/Hypertension' ) );
						} );
					},
				},
				{
					path: urlMap.diabetes,
					name: 'Diabetes',
					getComponent( nextState, cb ) {
						require.ensure( [], ( require ) => {
							registerModel( app, require( '../models/orderModel' ) );
							registerModel( app, require( '../models/chronicDiseaseModel' ) );
							cb( null, require( './ChronicDisease/Diabetes' ) );
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
			// childRoutes: [
			// 	{
			// 		path: modular.signFamily.url,
			// 		name: modular.signFamily.name,
			// 		getComponent( nextState, cb ) {
			// 			require.ensure( [], ( require ) => {
			// 				registerModel( app, require( '../models/bookingAgentModel' ) );
			// 				cb( null, require( './SignFamily/SignFamily' ) );
			// 			} );
			// 		},
			// 	},
			// ]
		},
	];

	return <Router history={history} routes={routes}/>;
}

export default RouterConfig;