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
			path: '/signFamily',
			name: 'SignFamilyPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './SignFamily/SignFamily' ) );
				} );
			},
		},
		{
			path: '/residentSign',
			name: 'ResidentSignPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './BookingAgent/ResidentSign' ) );
				} );
			},
		},
		{
			path: '/residentInspect',
			name: 'ResidentInspectPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './BookingAgent/ResidentInspect' ) );
				} );
			},
		},
		{
			path: '/newborn',
			name: 'NewbornPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './BookingAgent/Newborn' ) );
				} );
			},
		},
		{
			path: '/postpartum',
			name: 'PostpartumPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './BookingAgent/Postpartum' ) );
				} );
			},
		},
		{
			path: '/chronicDisease',
			name: 'ChronicDiseasePage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './NoticeAgent/ChronicDisease' ) );
				} );
			},
		},
		{
			path: '/newestPolicy',
			name: 'NewestPolicyPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './NoticeAgent/NewestPolicy' ) );
				} );
			},
		},
		{
			path: '/newestActivity',
			name: 'NewestActivityPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './NoticeAgent/NewestActivity' ) );
				} );
			},
		},
		{
			path: '/antenatalCare',
			name: 'AntenatalCarePage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './NoticeAgent/AntenatalCare' ) );
				} );
			},
		},
		{
			path: '/childHealth',
			name: 'ChildHealthPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './NoticeAgent/ChildHealth' ) );
				} );
			},
		},
		{
			path: '/medication',
			name: 'MedicationPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './TrackingReminder/Medication' ) );
				} );
			},
		},
		{
			path: '/curativeEffect',
			name: 'CurativeEffectPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './TrackingReminder/CurativeEffect' ) );
				} );
			},
		},
		{
			path: '/hypertension',
			name: 'HypertensionPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './ChronicDisease/Hypertension' ) );
				} );
			},
		},
		{
			path: '/diabetes',
			name: 'DiabetesPage',
			getComponent( nextState, cb ) {
				require.ensure( [], ( require ) => {
					//registerModel(app, require('./models/users'));
					cb( null, require( './ChronicDisease/Diabetes' ) );
				} );
			},
		},
	];

	return <Router history={history} routes={routes} />;
}

export default RouterConfig;