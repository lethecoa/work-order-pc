import React from 'react';
import { Modal, Button, Popover } from 'antd';
import { config, fun } from '../../common';
import { Scheme } from '../../components';
import HypertensionC from '../Hypertension/HypertensionC.js';
import styles from './FollowUpCell.less';

/**
 * 录入随访情况 组件
 */
class FollowUpCell extends React.Component {
  constructor( props ) {
    super( props );
    this.name = props.name;
  }

  render() {
    return (
      <Scheme { ...this.props } disabled={ true } />
    );
  }
}

export default FollowUpCell;