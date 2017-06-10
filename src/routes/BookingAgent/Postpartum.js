import React from 'react';
import {connect} from 'dva';
import styles from './Postpartum.css';

function Postpartum() {
	return (
		<div className={styles.normal}>
			Route Component: Postpartum
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( Postpartum );
