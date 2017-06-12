import React from 'react';
import { Form, Checkbox } from 'antd';
import { fun } from '../../../common'
import styles from './CarryMaterial.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const materialOptions = [
  { label: '身份证', value: 1 },
  { label: '社保卡', value: 2 },
];

class CarryMaterial extends React.Component {
  state = {
    checkedList: [ 1 ],
    Without: false,
    validateStatus: 'success',
    help: ''
  };
  check = () => {
    fun.print( this.state, 'check' );
    if ( !this.state.Without && this.state.checkedList.length == 0 ) {
      this.setState( {
        validateStatus: 'error',
        help: '请至少选择其中一项！'
      } );
    } else {
      this.setState( {
        validateStatus: 'success',
        help: ''
      } );
    }
  }
  selectOne = ( checkedList ) => {
    // fun.print( checkedList, 'selectWithout' );
    this.setState( {
      checkedList,
      Without: false,
    }, this.check );
  }
  selectWithout = ( e ) => {
    this.setState( {
      checkedList: [],
      Without: e.target.checked
    }, this.check );
  }
  render() {
    return (
      <FormItem label="所需携带材料" {...this.props.layout } hasFeedback required
        validateStatus={this.state.validateStatus} help={this.state.help}>
        <div className={styles.group}>
          <CheckboxGroup options={materialOptions}
            value={this.state.checkedList}
            onChange={this.selectOne} />
          <Checkbox value='0' checked={this.state.checked}
            onChange={this.selectWithout}
            checked={this.state.Without}>不携带任何材料</Checkbox>
        </div>
      </FormItem >
    )
  }
}

export default CarryMaterial;