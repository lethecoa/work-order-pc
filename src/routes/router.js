import React from 'react';
import { Router, Route } from 'dva/router';
import { urlMap } from '../common';

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
			path: urlMap.index,
			name: 'IndexPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					cb( null, require( './IndexPage/IndexPage' ) );
				} );
			},
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
			path: urlMap.signFamily,
			name: 'SignFamily',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/bookingAgentModel'));
					cb( null, require( './SignFamily/SignFamily' ) );
				} );
			},
		},
		{
			path: urlMap.residentSign,
			name: 'ResidentSign',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/bookingAgentModel'));
					cb( null, require( './BookingAgent/ResidentSign' ) );
				} );
			},
		},
		{
			path: urlMap.residentInspect,
			name: 'ResidentInspect',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/bookingAgentModel'));
					cb( null, require( './BookingAgent/ResidentInspect' ) );
				} );
			},
		},
		{
			path: urlMap.newborn,
			name: 'Newborn',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/bookingAgentModel'));
					cb( null, require( './BookingAgent/Newborn' ) );
				} );
			},
		},
		{
			path: urlMap.postpartum,
			name: 'Postpartum',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/bookingAgentModel'));
					cb( null, require( './BookingAgent/Postpartum' ) );
				} );
			},
		},
		{
			path: urlMap.chronicDisease,
			name: 'ChronicDisease',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/noticeAgentModel'));
					cb( null, require( './NoticeAgent/ChronicDisease' ) );
				} );
			},
		},
		{
			path: urlMap.newestPolicy,
			name: 'NewestPolicy',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/noticeAgentModel'));
					cb( null, require( './NoticeAgent/NewestPolicy' ) );
				} );
			},
		},
		{
			path: urlMap.newestActivity,
			name: 'NewestActivity',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/noticeAgentModel'));
					cb( null, require( './NoticeAgent/NewestActivity' ) );
				} );
			},
		},
		{
			path: urlMap.antenatalCare,
			name: 'AntenatalCare',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/noticeAgentModel'));
					cb( null, require( './NoticeAgent/AntenatalCare' ) );
				} );
			},
		},
		{
			path: urlMap.childHealth,
			name: 'ChildHealth',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/noticeAgentModel'));
					cb( null, require( './NoticeAgent/ChildHealth' ) );
				} );
			},
		},
		{
			path: urlMap.medication,
			name: 'Medication',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/trackingReminderModel'));
					cb( null, require( './TrackingReminder/Medication' ) );
				} );
			},
		},
		{
			path: urlMap.curativeEffect,
			name: 'CurativeEffect',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/trackingReminderModel'));
					cb( null, require( './TrackingReminder/CurativeEffect' ) );
				} );
			},
		},
		{
			path: urlMap.hypertension,
			name: 'Hypertension',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/chronicDiseaseModel'));
					cb( null, require( './ChronicDisease/Hypertension' ) );
				} );
			},
		},
		{
			path: urlMap.diabetes,
			name: 'Diabetes',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					registerModel(app, require('../models/chronicDiseaseModel'));
					cb( null, require( './ChronicDisease/Diabetes' ) );
				} );
			},
		},
	];

	return <Router history={history} routes={routes} />;
}

export default RouterConfig;