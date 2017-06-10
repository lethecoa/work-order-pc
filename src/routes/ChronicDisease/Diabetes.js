import React from 'react';
import {connect} from 'dva';
import styles from './Diabetes.css';

function Diabetes() {
	return (
		<div className={styles.normal}>
			Route Component: Diabetes
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( Diabetes );
