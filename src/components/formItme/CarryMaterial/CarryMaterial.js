import React from 'react';
import { Form, Checkbox } from 'antd';
import { fun } from '../../../common'
import styles from './CarryMaterial.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const materialOptions = [
  { label: '身份证', value: 1 },
  { label: '社保卡', value: 2 },
  { label: '不携带任何材料', value: 0 },
];

class CarryMaterial extends React.Component {
  constructor( props ) {
    super( props );

    const value = this.props.value || {};
    this.state = {
      valueList: value.valueList || [ 1 ]
    };
  }
  componentWillReceiveProps( nextProps ) {
    if ( 'value' in nextProps ) {
      const value = nextProps.value;
      this.setState( value );
    }
  }
  selectOne = ( list ) => {
    let valueList;
    if ( list[ list.length - 1 ] === 0 ) {
      valueList = [ 0 ];
    } else {
      valueList = list.filter(( item ) => { return item !== 0; } );
    }
    this.setState( { valueList: valueList } );
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
        value={this.state.valueList} />
    )
  }
}

export default CarryMaterial;