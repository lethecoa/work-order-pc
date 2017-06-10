import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.less';

function IndexPage() {
	return (
		<div className={styles.normal}>
			<h1 className={styles.title}>React,你敢不敢再难一点！？</h1>
			<div className={styles.welcome}/>
		</div>
	);
}

function mapStateToProps( state ) {

}

export default connect( mapStateToProps )( IndexPage );