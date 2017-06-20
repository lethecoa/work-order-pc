import React from 'react';
import {Form, Input, Radio} from 'antd';
import {config} from '../../../common';
import styles from './Hypertension.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function Diabetes( props ) {
	const { getFieldDecorator } = props.form;
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
							<Radio value={2}>方案二：协助医生随访糖尿病患者的症状</Radio>
							<Radio value={3}>方案三：协助医生随访糖尿病患者的血糖数值</Radio>
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