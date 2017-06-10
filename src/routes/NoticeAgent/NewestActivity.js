import React from 'react';
import {connect} from 'dva';
import styles from './NewestActivity.css';

function NewestActivity() {
	return (
		<div className={styles.normal}>
			Route Component: NewestActivity
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( NewestActivity );
