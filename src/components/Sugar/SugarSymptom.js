import React from 'react';
import { Checkbox, Row, Col,Form  } from 'antd';
import { config } from '../../common'
const moduleName = '糖尿病症状选择(SugarSymptom)';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const symptomOptions = [
  { label: '无症状', value: 0 },
  { label: '多尿', value: 1 },
  { label: '手脚麻木', value: 2 },
  { label: '多饮', value: 3 },
  { label: '视力模糊', value: 4 },
  { label: '下肢浮肿', value: 5},
  { label: '多食', value: 6 },
  { label: '感染', value: 7 },
  { label: '体重明显下降', value:8 },
];

class SugarSymptom extends React.Component {
  constructor( props ) {
    super( props );
    this.state  = {
      value: props.value,
      checked: true,
      disabled: false,
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
    const { getFieldDecorator } = this.props.form;
    return (
        <CheckboxGroup options={symptomOptions} onChange={this.selectOne}
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

export default Form.create()(SugarSymptom);
