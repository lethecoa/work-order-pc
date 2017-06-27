import React from 'react';
import {Form, Radio, InputNumber, Button,Row, Col,Modal} from 'antd';
import styles from './HypertensionA.less';
import {config} from '../../common'
import {MedicationInfo} from '../../components';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
let medicationInfo;
class HypertensionA extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.state = {
      visible: false,
      size: 'small',
      text: '预览',
      value:1,
      medicationInfo:[],
    }
  }

/*  callBack = (data)=> {
    console.log(data.medicationInfo.dataSource);
    this.setState({
      medicationInfo: {...data.medicationInfo.dataSource},
    });
  }*/

/*  GetMedicationInfo = ( e ) => {
  //e.preventDefault();
    medicationInfo.callback () ;
};*/

  render() {
    const { getFieldDecorator } = this.props.form;
    const disable=!this.props.disabled;

    return (
      <div className={styles.need}>
        <div className={styles.title}>随访项目</div>
        <div className={styles.line}>
          <div className={styles.item}>1.体征</div>
          <div className={styles.form}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="舒张压（mmHg）">
                  {getFieldDecorator('sbp', {
                    rules: [],
                  })(
                    <InputNumber  style={{width: 200}} disabled={disable} min={1} max={300} placeholder="请输入1-300之间的一个数值"/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="收缩压（mmHg）">
                  {getFieldDecorator('dbp', {
                    rules: [],
                  })(
                    <InputNumber   style={{width: 200}} disabled={disable} min={1} max={300} placeholder="请输入1-300之间的一个数值"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="体重（Kg）">
                  {getFieldDecorator('weight', {
                    rules: [],
                  })(
                    <InputNumber   style={{width: 200}} disabled={disable} min={1} max={300} />
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>

      <div className={styles.line}>
          <div className={styles.item}>2.生活方式</div>
          <div className={styles.form}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="日吸烟量（支）">
                  {getFieldDecorator('smokingPerDay', {
                    rules: [],
                  })(
                    <InputNumber style={{width: 200}} disabled={disable}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="日饮酒量（两）">
                  {getFieldDecorator('drinkingPerDay', {
                    rules: [],
                  })(
                    <InputNumber min={1} max={300} style={{width: 200}} disabled={disable}/>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="运动频次（次/周）">
                  {getFieldDecorator('exerciseFrequency', {
                    rules: [],
                  })(
                    <InputNumber min={1} max={300} style={{width: 200}} disabled={disable}/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="运动时长（分钟/次）">
                  {getFieldDecorator('exerciseDuration', {
                    rules: [],
                  })(
                    <InputNumber min={1} max={300} style={{width: 200}} disabled={disable}/>
                  )}
                </FormItem>
              </Col>

            </Row>

            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="摄盐情况（咸淡）">
                  {getFieldDecorator('saltUptake', { rules: [],})(
                    <RadioGroup  style={{width: 200}} disabled={disable}>
                      <Radio value={1}>轻</Radio>
                      <Radio value={2}>中</Radio>
                      <Radio value={3}>重</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
              </Col>
            </Row>
          </div>
        </div>
       <div className={styles.line}>
          <div className={styles.item}>3.辅助检查</div>
          <div className={styles.form}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="药物依从性">
                  {getFieldDecorator('drugCompliance', { rules: [],})(
                    <RadioGroup  style={{width: 200}} disabled={disable} >
                      <Radio value={1}>规律</Radio>
                      <Radio value={2}>间断</Radio>
                      <Radio value={3}>不服药</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="药物不良反应">
                  {getFieldDecorator('adr', { rules: [],})(
                    <RadioGroup  style={{width: 200}} disabled={disable} >
                      <Radio value={1}>无</Radio>
                      <Radio value={2}>有</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="低血糖反应">
                  {getFieldDecorator('hypoglycemia', {})(
                    <RadioGroup  style={{width: 200}} disabled={disable}>
                      <Radio value={1}>无</Radio>
                      <Radio value={2}>偶尔</Radio>
                      <Radio value={3}>频繁</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="此次随访情况">
                  {getFieldDecorator('followUpType', {})(
                    <RadioGroup  style={{width: 400}}  disabled={disable} >
                      <Radio value={1}>控制良好</Radio>
                      <Radio value={2}>控制一般</Radio>
                      <Radio value={3}>控制差</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>
          </div>
        <div className={styles.item}>4.用药情况</div>
          <div className={styles.form}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('medicationInfo',{})(
                <MedicationInfo  disabled={true}   ref={e => ( medicationInfo = e )} />
              )}
            </FormItem>

          </div>
      </div>
    )
  }
}
export default Form.create()(HypertensionA);


