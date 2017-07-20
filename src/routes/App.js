import React from 'react';
import { connect } from 'dva';
import { MainLayout } from '../components';

function App( { dispatch, user, children, location: { pathname } } ) {
	return (
		<MainLayout user={user} dispatch={dispatch} pathname={pathname.replace( '/', '' )}>
			{children}
		</MainLayout>
	);
}

function mapStateToProps( state ) {
	return {
		user: state.appModel.user,
	};
}

export default connect( mapStateToProps )( App );