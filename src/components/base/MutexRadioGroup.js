import React from 'react';
import { Checkbox } from 'antd';
import { fun } from '../../common';

const CheckboxGroup = Checkbox.Group;

export default class MutexRadioGroup extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      options: [],
      value: props.value || []
    };
  }
  selectOne = ( list ) => {
    let valueList;
    if ( list[ list.length - 1 ] === 0 ) {
      valueList = [ 0 ];
    } else {
      valueList = list.filter(( item ) => { return item !== 0; } );
    }
    this.setState( { value: valueList } );
    this.triggerChange( valueList );
  }
  triggerChange = ( changedValue ) => {
    const onChange = this.props.onChange;
    if ( onChange ) {
      onChange( changedValue );
    }
  }
  render() {
    return (
      <CheckboxGroup options={ this.state.options } onChange={ this.selectOne }
        value={ this.state.value } disabled={ this.props.disabled } />
    )
  }
  componentWillReceiveProps( nextProps ) {
    if ( 'value' in nextProps && nextProps[ 'value' ] !== undefined ) {
      const value = nextProps.value;
      this.setState( value );
    }
  }
}