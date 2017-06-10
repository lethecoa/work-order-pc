import React from 'react';
import {connect} from 'dva';
import styles from './AntenatalCare.css';

function AntenatalCare() {
	return (
		<div className={styles.normal}>
			Route Component: AntenatalCare
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( AntenatalCare );
