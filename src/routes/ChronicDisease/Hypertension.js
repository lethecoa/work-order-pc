import React from 'react';
import {connect} from 'dva';
import styles from './Hypertension.css';

function Hypertension() {
	return (
		<div className={styles.normal}>
			Route Component: Hypertension
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( Hypertension );
