import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less'

const Header = ({ location }) => {
  return (
    <div className={styles.normal}>
      <Link to="/login"><img src="/logo.png" /></Link>
    </div>
  );
};

export default Header;
