import React from 'react';
import {connect} from 'dva';
import styles from './ChildHealth.css';

function ChildHealth() {
	return (
		<div className={styles.normal}>
			Route Component: ChildHealth
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( ChildHealth );
