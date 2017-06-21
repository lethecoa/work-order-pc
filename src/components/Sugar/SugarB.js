import React from 'react';
import {Form, Input, Table, Row,Checkbox,Col} from 'antd';
import styles from './SugarB.less';
import {config, fun} from '../../common';
import {SugarSymptom} from '../../components';

const CheckboxGroup = Checkbox.Group;
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

class SugarB extends React.Component {
  render() {
    const disable=true;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.need}>
        <div className={styles.title}>随访项目</div>

  <Row>
    <Col span={12}>
        <FormItem label="症状" className={styles.item}>
          {getFieldDecorator( 'symptom', {
            rules: [
              {
                required: true,
                message: '请至少选择其中一项！'
              },
            ],
          } )( <SugarSymptom disabled={disable}/> )}
        </FormItem>
    </Col>
  </Row>
        <Row>
          <Col span={24}>
          <FormItem label="其他症状" className={styles.item}>
            {getFieldDecorator('otherSymptom')(
                <Input type="textarea" size="large" rows={4} disabled={disable} placeholder="可在此处输入其他症状"/>
            )}

          </FormItem>

  </Col>
  </Row>
      </div>
    );
  }
}
export default Form.create()(SugarB);
