import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less'

const Header = ({ location }) => {
  return (
    <div className={styles.normal}>
      <img src="/logo.png" />
    </div>
  );
};

export default Header;
