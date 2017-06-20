import React from 'react';
import {Row, Col, Form, DatePicker, Input, Radio} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../../common';
import styles from './ChildHealth.less';

const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

function ChildHealth( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem label="随访项目" {...config.formItemLayout}>
					{getFieldDecorator( 'interviewItem', {
						initialValue: props.interviewItem,
						rules: [
							{
								required: true,
								message: '必须填写随访项目！'
							},
						],
					} )( <Input placeholder="请输入随访项目" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem {...config.formItemLayout} label="是否确认可到场情况">
					{getFieldDecorator( 'isOnSceneSituation', {
						initialValue: props.isOnSceneSituation ? parseInt( props.isOnSceneSituation ) : 1
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem label="随访地点" {...config.formItemLayout}>
					{getFieldDecorator( 'interviewSite', {
						initialValue: props.interviewSite,
						rules: [
							{
								required: true,
								message: '必须填写随访地点！'
							},
						],
					} )( <Input placeholder="请输入您希望的随访地点" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="随访时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate', {
						initialValue: [
							props.interviewDateStart ? moment( fun.getLocalTime( props.interviewDateStart ), 'YYYY-MM-DD HH:00' ) : undefined,
							props.interviewDateEnd ? moment( fun.getLocalTime( props.interviewDateEnd ), 'YYYY-MM-DD HH:00' ) : undefined ],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个随访时间段，精确到小时！'
							},
						],
					} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem {...config.formItemLayout} label="其他要求">
					{getFieldDecorator( 'otherRequirements', {
						initialValue: props.otherRequirements
					} )(
						<Input type="textarea" rows={4} placeholder="请在此输入您的其它要求" disabled={props.disabled}/>
					)}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( ChildHealth );