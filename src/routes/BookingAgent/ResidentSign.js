import React from 'react';
import {connect} from 'dva';
import styles from './ResidentSign.css';

function ResidentSign() {
	return (
		<div className={styles.normal}>
			Route Component: ResidentSign
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( ResidentSign );
