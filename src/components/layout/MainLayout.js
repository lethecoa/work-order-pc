import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';
import Sidebar from './Sidebar'
import { fun } from '../../common';

const moudleName = '主框架(MainLayout)';

class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <Header user={this.props.user} dispatch={this.props.dispatch} />
        <div className={styles.content}>
          <Sidebar></Sidebar>
          <div className={styles.main}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    console.log( 'componentDidMount' );
  }
}

export default MainLayout;