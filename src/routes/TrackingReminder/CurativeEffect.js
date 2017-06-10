import React from 'react';
import {connect} from 'dva';
import styles from './CurativeEffect.css';

function CurativeEffect() {
	return (
		<div className={styles.normal}>
			Route Component: CurativeEffect
		</div>
	);
}

function mapStateToProps() {
	return {};
}

export default connect( mapStateToProps )( CurativeEffect );
