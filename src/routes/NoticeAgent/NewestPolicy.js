import React from 'react';
import {connect} from 'dva';
import styles from './NewestPolicy.css';

function NewestPolicy() {
	return (
		<div className={styles.normal}>
			Route Component: NewestPolicy
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( NewestPolicy );
