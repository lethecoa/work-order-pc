import React from 'react';
import {connect} from 'dva';
import {MainLayout} from '../components';

function App( { dispatch, user, children } ) {
	return (
		<MainLayout user={user} dispatch={dispatch}>
			<div>
				{children}
			</div>
		</MainLayout>
	);
}

function mapStateToProps( state ) {
	return {
		user: state.appModel.user,
	};
}

export default connect( mapStateToProps )( App );