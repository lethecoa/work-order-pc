import React from 'react';
import {connect} from 'dva';
import styles from './Newborn.css';

function Newborn() {
	return (
		<div className={styles.normal}>
			Route Component: Newborn
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( Newborn );
