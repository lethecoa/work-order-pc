import React from 'react';
import { Checkbox, Row, Col,Form  } from 'antd';
import { config } from '../../common'
const moduleName = '高血压症状选择(HypertensionSymptom)';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const symptomOptions = [
  { label: '无症状', value: 0 },
  { label: '眼花耳鸣', value: 1 },
  { label: '四肢发麻', value: 2 },
  { label: '头痛头晕', value: 3 },
  { label: '呼吸困难', value: 4 },
  { label: '下肢水肿', value: 5},
  { label: '恶心呕吐', value: 6 },
  { label: '心悸胸闷', value: 7 },
];
class HypertensionSymptom extends React.Component {
  constructor( props ) {
    super( props );
    this.state  = {
      value: props.value ,
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

export default Form.create()(HypertensionSymptom);
