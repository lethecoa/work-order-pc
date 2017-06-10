import React from 'react';
import {connect} from 'dva';
import styles from './Medication.css';

function Medication() {
	return (
		<div className={styles.normal}>
			Route Component: Medication
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( Medication );
