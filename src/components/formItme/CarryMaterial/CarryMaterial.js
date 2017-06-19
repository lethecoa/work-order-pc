import React from 'react';
import { Checkbox } from 'antd';
import { fun } from '../../../common'
import styles from './CarryMaterial.less';

const moduleName = '所需携带材料控件(CarryMaterial)';
const CheckboxGroup = Checkbox.Group;
const materialOptions = [
  { label: '身份证', value: 1 },
  { label: '社保卡', value: 2 },
  { label: '不携带任何材料', value: 0 },
];

class CarryMaterial extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      value: props.value || [ 1 ]
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
    // fun.print( this.state.valueList, 'triggerChange2' );
  }
  render() {
    return (
      <CheckboxGroup options={materialOptions} onChange={this.selectOne}
        value={this.state.value} disabled={this.props.disabled} />
    )
  }
  componentWillReceiveProps( nextProps ) {
    if ( 'value' in nextProps && nextProps[ 'value' ] !== undefined ) {
      const value = nextProps.value;
      this.setState( value );
    }
  }
}

export default CarryMaterial;