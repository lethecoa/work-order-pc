import React from 'react';
import { Form, DatePicker,InputNumber,Row, Col} from 'antd';
import { config } from '../../common'
import styles from './DiabetesC.less';

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
class DiabetesC extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {

    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const disable=!this.props.disabled;
    return (
      <div className={styles.need}>
        <div className={styles.title}>随访项目</div>
        <div className={styles.form}>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="空腹血糖（mmol/L）">
                {getFieldDecorator('sbp', {
                  rules: [{required: true, message: '请输入空腹血糖'}],
                })(
                  <InputNumber min={1} max={300} style={{ width: 200 }} disabled={disable}/>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem {...formItemLayout} label="餐后血糖（mmol/L））">
                {getFieldDecorator('dbp', {
                  rules: [{required: true, message: '请输入餐后血糖'}],
                })(
                  <InputNumber min={1} max={300} style={{ width: 200} }disabled={disable} />
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}
export default Form.create()(DiabetesC);

