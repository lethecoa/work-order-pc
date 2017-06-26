import React from 'react';
import { Modal, Button, Popover } from 'antd';
import { config, fun } from '../../common';
import HypertensionC from '../Hypertension/HypertensionC.js';
import styles from './FollowUpCell.less';

/**
 * 录入随访情况 组件
 */
class FollowUpCell extends React.Component {
  constructor( props ) {
    super( props );
    this.name = props.name;
    this.state = {
      visible: false,
    }
  }

  handlerClick = ( e ) => {
    this.setState( { visible: true } );
  }

  handleOk = ( e ) => {
    console.log( e );
    this.setState( { visible: false } );
  }

  handleCancel = ( e ) => {
    console.log( e );
    this.setState( { visible: false } );
  }

  render() {
    return (
      <div>
        {/*<a onClick={this.handlerClick} disabled>方案一</a>&nbsp;
        <a onClick={this.handlerClick} disabled>方案二</a>&nbsp;
        <Popover content={<HypertensionC disabled />} title="方案三" overlayClassName={styles.popup} trigger="hover"
          ref="popover">
          <a onClick={this.handlerClick} onMouseOver={this.showPlan}>方案三</a>
        </Popover>*/}
        <a onClick={this.handlerClick}>录入随访情况</a>
        <Modal title="高血压患者血压填写表" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
          <HypertensionC />
        </Modal>
      </div>
    );
  }
}

export default FollowUpCell;