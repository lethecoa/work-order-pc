import React from 'react';
import {Row, Col, Form, DatePicker, Input, Checkbox} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../../common';
import CarryMaterial from '../../formItme/CarryMaterial/CarryMaterial';
import styles from './ChronicDisease.less';

const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;

const interviewOptions = [
	{ label: '血压', value: 1 },
	{ label: '血糖', value: 2 },
	{ label: '血脂', value: 3 },
	{ label: '糖化血红蛋白', value: 4 }
];
function ChronicDisease( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem label="随访项目" {...config.formItemLayout}>
					{getFieldDecorator( 'interviewItem', {
						initialValue: props.interviewItem ? fun.strToIntArr( props.interviewItem ) : [],
						rules: [
							{
								required: true,
								message: '请至少选择一个随访项目！'
							},
						],
					} )( <CheckboxGroup options={interviewOptions} disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="社区联系方式" {...config.formItemLayout}>
					{getFieldDecorator( 'communityContact', {
						initialValue: props.communityContact,
						rules: [
							{
								required: true,
								message: '必须填写社区联系方式！'
							},
						],
					} )( <Input placeholder="请输入社区联系方式" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="所需携带材料" {...config.formItemLayout}>
					{getFieldDecorator( 'carryMaterial', {
						initialValue: props.carryMaterial ? fun.strToIntArr( props.carryMaterial ) : [ 1 ],
						rules: [
							{
								required: true,
								message: '请至少选择其中一项！'
							},
						],
					} )( <CarryMaterial disabled={props.disabled}/> )}
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
						initialValue: props.interviewDateStart ? [
							moment( new Date( parseInt( props.interviewDateStart ) ), 'YYYY-MM-DD HH:mm' ),
							moment( new Date( parseInt( props.interviewDateEnd ) ), 'YYYY-MM-DD HH:mm' ) ] : [],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个随访时间段，精确到小时！'
							},
						],
					} )( <RangePicker
						size="small"
						showTime
						format="YYYY-MM-DD HH:mm"
						disabled={props.disabled}
						disabledDate={( current ) => current && current.valueOf() < Date.now()}
					/> )}
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

export default Form.create()( ChronicDisease );