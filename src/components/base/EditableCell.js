import React from 'react';
import { config, fun } from '../../common';

export default class EditableCell extends React.Component {
  constructor( props ) {
    super( props );
    this.cacheValue = props.value || '';
    this.name = props.name;
    this.state = {
      value: props.value || '',
      myStatus: props.myStatus || config.ritStatus.general
    }
  }

  componentWillReceiveProps( nextProps ) {
    // fun.print( nextProps, 'componentWillReceiveProps', this.state.name );
    if ( nextProps.myStatus !== this.state.myStatus ) {
      // 传入的状态为显示，说明之前是编辑状态
      if ( nextProps.myStatus === config.ritStatus.general ) {
        this.setState( { myStatus: nextProps.myStatus } );
        this.cacheValue = typeof this.state.value !== 'undefined' ? this.state.value.trim() : '';
        this.props.onChange( this.name, this.cacheValue );
      }
      // 传入的状态是编辑中，说明之前的状态是显示
      else if ( nextProps.myStatus === config.ritStatus.editing ) {
        this.setState( { myStatus: nextProps.myStatus, value: nextProps.value } );
      }
      //  传入取消的状态，则不保存刚刚的用户输入
      else {
        this.setState( { myStatus: config.ritStatus.general, value: this.cacheValue } );
        // this.props.onChange( this.name, this.cacheValue );
      }
    }
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextProps.myStatus !== this.state.myStatus || nextState.value !== this.state.value;
  }

  handleChange( e ) {
    const value = e.target.value;
    this.setState( { value } );
  }
}