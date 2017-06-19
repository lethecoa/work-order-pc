import React from 'react';
import {Form, DatePicker, Input, Radio} from 'antd';
import moment from 'moment';
import {config, fun} from '../../../common';
import styles from './Newborn.less';

const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

function Newborn( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;
	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="访视检查内容">
					{getFieldDecorator( 'examineContent', {
						initialValue: props.examineContent,
						rules: [
							{
								required: true,
								message: '请输入访视检查内容！'
							},
						],
					} )( <Input type="textarea" rows={4} placeholder="请在此输入访视检查内容" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="上午访视时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate_am', {
						initialValue: [
							props.amInterviewTimeStart ? moment( fun.getLocalTime( props.amInterviewTimeStart ), 'YYYY-MM-DD HH:00' ) : undefined,
							props.amInterviewTimeEnd ? moment( fun.getLocalTime( props.amInterviewTimeEnd ), 'YYYY-MM-DD HH:00' ) : undefined ],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个时间段，精确到小时！'
							},
						],
					} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="下午访视时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate_pm', {
						initialValue: [
							props.pmInterviewTimeStart ? moment( fun.getLocalTime( props.pmInterviewTimeStart ), 'YYYY-MM-DD HH:00' ) : undefined,
							props.pmInterviewTimeEnd ? moment( fun.getLocalTime( props.pmInterviewTimeEnd ), 'YYYY-MM-DD HH:00' ) : undefined ],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个时间段，精确到小时！'
							},
						],
					} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem {...config.formItemLayout} label="是否收费">
					{getFieldDecorator( 'isCharge', {
						initialValue: props.isCharge ? parseInt( props.isCharge ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem label="预约人数" {...config.formItemLayout}>
					{getFieldDecorator( 'appointmentNumberIllustration', {
						initialValue: props.appointmentNumberIllustration,
						rules: [
							{
								required: true,
								message: '必须填写预约人数！'
							},
						],
					} )( <Input placeholder="如：上午可预约3人，下午可预约5人" disabled={props.disabled}/> )}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( Newborn );