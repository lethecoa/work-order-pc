import React from 'react';
import { Form, DatePicker,InputNumber,Row, Col} from 'antd';
import { config } from '../../common'
import styles from './HypertensionC.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

class HypertensionC extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const disable=!this.props.disabled;
    return (
      <div className={styles.need}>
        <div className={styles.title}>随访项目</div>
        <div className={styles.form}>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="舒张压（mmHg）">
                {getFieldDecorator('sbp', {
                  rules: [{required: true, message: '请输入舒张压（mmHg），范围为0~300'}],
                })(
                  <InputNumber min={1} max={300} style={{ width: 200 }}disabled={disable} placeholder="请输入1-300之间的一个数值" />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem {...formItemLayout} label="收缩压（mmHg）">
                {getFieldDecorator('dbp', {
                  rules: [{required: true, message: '请输入舒张压（mmHg），范围为0~300'}],
                })(
                  <InputNumber min={1} max={300} style={{ width: 200} } disabled={disable} placeholder="请输入1-300之间的一个数值"  />
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}
export default Form.create()(HypertensionC);

