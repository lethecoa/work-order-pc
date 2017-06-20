import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

function IndexPage() {
	return (
		<div className={styles.normal}>
			<h1 className={styles.title}>我是首页</h1>
			<div className={styles.welcome} />
		</div>
	);
}

function mapStateToProps( state ) {
	return {}
}

export default connect( mapStateToProps )( IndexPage );