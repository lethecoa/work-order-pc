import React from 'react';
import {Form, Input, Radio,Button,Modal} from 'antd';
import {config} from '../../../common';
import styles from './Diabetes.less';
import {DiabetesA,DiabetesB,DiabetesC} from '../../../components';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function Diabetes( props ) {
	const { getFieldDecorator } = props.form;
  const size = "small";
  const text = "预览";
  const showPlan =(e) => {
    let plan=e.currentTarget.id;
    let planNode=<DiabetesA disabled={props.disabled}/>;
    let title= '方案1   (价格：暂未定价)';
    if("2"===plan){
      title= '方案2     (价格：暂未定价)';
      planNode=<DiabetesB disabled={props.disabled}/>;
    }else if("3"===plan){
      title= '方案3     (价格：暂未定价)';
      planNode=<DiabetesC disabled={props.disabled}/>;
    }
    Modal.info({
      title: title,
      visible: true,
      content: (
        planNode
      ),
      width: '1100',
      onOk() {
      },
    });
  }

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="随访方案">
					{getFieldDecorator( 'interviewScheme', {
						initialValue: props.interviewScheme ? parseInt( props.interviewScheme ) : 1
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>方案一：协助医生随访糖尿病患者的体征、生活方式、辅助检查、用药情况</Radio>
              <Button type="primary"size={size} disbaled={props.disabled}  icon="play-circle"   id={1}  onClick={showPlan}>{text}</Button>
              <br/>

							<Radio value={2}>方案二：协助医生随访糖尿病患者的症状</Radio>
              <Button type="primary" size={size} disbaled={props.disabled} icon="play-circle"  id={2}  onClick={showPlan}>{text}</Button>
              <br/>

							<Radio value={3}>方案三：协助医生随访糖尿病患者的血糖数值</Radio>
              <Button type="primary" size={size} disbaled={props.disabled} icon="play-circle"  id={3} onClick={showPlan}>{text}</Button>
              <br/>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...config.formItemLayout} label="要求">
					{getFieldDecorator( 'requirements', {
						initialValue: props.requirements,
					} )(
						<Input type="textarea" rows={8} placeholder="请输入您的其他要求" disabled={props.disabled}/>
					)}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( Diabetes );
