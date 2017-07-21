import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

function IndexPage() {
	return (
		<div className={ styles.normal }>
			<img src='/index.png' />
		</div>
	);
}

function mapStateToProps( state ) {
	return {}
}

export default connect( mapStateToProps )( IndexPage );