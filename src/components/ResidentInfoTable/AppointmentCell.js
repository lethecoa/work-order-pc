import React from 'react';
import { config, fun } from '../../common';

/**
 * 预约情况 组件
 */
class AppointmentCell extends React.Component {
  constructor( props ) {
    super( props );
    this.name = props.name;
  }

  handlerClick = ( e ) => {
    console.log( 'handlerClick' );
  }

  render() {
    return (
      <a onClick={this.handlerClick}>填写预约情况</a>
    );
  }
}

export default AppointmentCell;