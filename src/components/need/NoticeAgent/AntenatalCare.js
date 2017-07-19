import React from 'react';
import {Row, Col, Form, DatePicker, Input, Checkbox, Radio} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../../common';
import CarryMaterial from '../../formItme/CarryMaterial/CarryMaterial';
import styles from './AntenatalCare.less';

const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;

const options = [
	{ label: '常规', value: 1 },
	{ label: '尿常规', value: 2 },
	{ label: '肾功能', value: 3 },
	{ label: '肝功能', value: 4 },
	{ label: '血压', value: 5 },
	{ label: '体重', value: 6 },
	{ label: '宫高', value: 7 },
	{ label: '胎心率', value: 8 }
];
function AntenatalCare( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem label="产检项目" {...config.formItemLayout}>
					{getFieldDecorator( 'antenatalCareItem', {
						initialValue: props.antenatalCareItem ? fun.strToIntArr( props.antenatalCareItem ) : [],
						rules: [
							{
								required: true,
								message: '请至少选择一个产检项目！'
							},
						],
					} )( <CheckboxGroup options={options} disabled={props.disabled}/> )}
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
				<FormItem label="产检地点" {...config.formItemLayout}>
					{getFieldDecorator( 'antenatalCareSite', {
						initialValue: props.antenatalCareSite,
						rules: [
							{
								required: true,
								message: '必须填写产检地点！'
							},
						],
					} )( <Input placeholder="请输入您希望的产检地点" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="产检时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate', {
						initialValue: props.antenatalCareDateStart ? [
							moment( new Date( parseInt( props.antenatalCareDateStart ) ), 'YYYY-MM-DD HH:mm' ),
							moment( new Date( parseInt( props.antenatalCareDateEnd ) ), 'YYYY-MM-DD HH:mm' ) ] : [],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个产检时间段，精确到小时！'
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
				<FormItem {...config.formItemLayout} label="产检注意事项">
					{getFieldDecorator( 'antenatalCareMatter', {
						initialValue: props.antenatalCareMatter ? parseInt( props.antenatalCareMatter ) : 1
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>空腹体检：前一天晚上10点以后不能摄入食物</Radio>
							<Radio value={0}>无</Radio>
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

export default Form.create()( AntenatalCare );