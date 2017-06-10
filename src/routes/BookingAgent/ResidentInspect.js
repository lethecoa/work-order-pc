import React from 'react';
import {connect} from 'dva';
import styles from './ResidentInspect.css';

function ResidentInspect() {
	return (
		<div className={styles.normal}>
			Route Component: ResidentInspect
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( ResidentInspect );
