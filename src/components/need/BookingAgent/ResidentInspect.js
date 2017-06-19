import React from 'react';
import {Form, DatePicker, Input, Radio, Checkbox} from 'antd';
import moment from 'moment';
import {config, fun} from '../../../common';
import CarryMaterial from '../../formItme/CarryMaterial/CarryMaterial';
import styles from './ResidentInspect.less';

const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;
const materialOptions = [
	{ label: '临床血液检验：a.白细胞 b.红细胞 c.血小板 d.血红蛋白', value: 1 },
	{ label: '临床尿液检查：a.红细胞 b.白细胞 c.上皮细胞', value: 2 },
	{ label: '肝功能', value: 3 },
	{ label: '肾功能', value: 4 },
	{ label: '血脂', value: 5 },
	{ label: '心电图', value: 6 },
	{ label: 'B超', value: 7 },
];
function ResidentInspect( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;
	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem label="预约体检项目" {...config.formItemLayout}>
					{getFieldDecorator( 'examineItem', {
						initialValue: props.examineItem ? fun.strToIntArr( props.examineItem ) : [],
						rules: [
							{
								required: true,
								message: '请至少选择其中一项！'
							},
						],
					} )( <CheckboxGroup options={materialOptions} disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="所需携带材料" {...config.formItemLayout}>
					{getFieldDecorator( 'carryMaterial', {
						initialValue: props.carryMaterial ? fun.strToIntArr(props.carryMaterial) : [ 1 ],
						rules: [
							{
								required: true,
								message: '请至少选择其中一项！'
							},
						],
					} )( <CarryMaterial disabled={props.disabled}/> )}
				</FormItem>
				<FormItem {...config.formItemLayout} label="体检注意事项">
					{getFieldDecorator( 'announcements', {
						initialValue: props.announcements ? parseInt( props.announcements ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>空腹：晚上10点后不摄入食物</Radio>
							<Radio value={0}>无</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem label="体检地点" {...config.formItemLayout}>
					{getFieldDecorator( 'examineSite', {
						initialValue: props.examineSite,
						rules: [
							{
								required: true,
								message: '必须填写体检地点！'
							},
						],
					} )( <Input placeholder="请输入您希望的体检地点" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="预约体检时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate', {
						initialValue: [
							props.examineDateStart ? moment( fun.getLocalTime( props.examineDateStart ), 'YYYY-MM-DD HH:00' ) : undefined,
							props.examineDateEnd ? moment( fun.getLocalTime( props.examineDateEnd ), 'YYYY-MM-DD HH:00' ) : undefined ],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个预约体检时间段，精确到小时！'
							},
						],
					} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem {...config.formItemLayout} label="体检是否免费">
					{getFieldDecorator( 'isFree', {
						initialValue: props.isFree ? parseInt( props.isFree ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
						</RadioGroup>
					)}
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

export default Form.create()( ResidentInspect );