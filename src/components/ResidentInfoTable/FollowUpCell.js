import React from 'react';
import { config, fun } from '../../common';

/**
 * 录入随访情况 组件
 */
class FollowUpCell extends React.Component {
  constructor( props ) {
    super( props );
    this.name = props.name;
  }

  handlerClick = ( e ) => {
    console.log( 'handlerClick' );
  }

  render() {
    return (
      <a onClick={this.handlerClick}>录入随访情况</a>
    );
  }
}

export default FollowUpCell;