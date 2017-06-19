import React from 'react';
import { Form, Input } from 'antd';
import { config } from '../../common';

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 15 } };

class HypertensionC extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {

    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{ paddingTop: '15px' }}>
        <FormItem label="舒张压（mmHg）" {...formItemLayout}>
          {getFieldDecorator( 'diastolic' )( <Input /> )}
        </FormItem>
        <FormItem label="收缩压（mmHg）" {...formItemLayout}>
          {getFieldDecorator( 'systolic' )( <Input /> )}
        </FormItem>
      </Form>
    );
  }
}

const WrapHypertensionC = Form.create()( HypertensionC );
export default WrapHypertensionC;