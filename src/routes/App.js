import React from 'react';
import {connect} from 'dva';
import {MainLayout} from '../components';

function App( { dispatch, user, loading, children, location: { pathname } } ) {
	return (
		<MainLayout user={user} loading={loading} dispatch={dispatch} pathname={pathname.replace( '/', '' )}>
			{children}
		</MainLayout>
	);
}

function mapStateToProps( state ) {
	return {
		user: state.appModel.user,
		loading: state.loading.models.appModel
	};
}

export default connect( mapStateToProps )( App );