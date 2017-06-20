import React from 'react';
import {Row, Col, Form, DatePicker, Input, Radio} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../../common/index';
import CarryMaterial from '../../formItme/CarryMaterial/CarryMaterial';
import styles from './NewestActivity.less';

const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

function NewestActivity( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="是否确认居民可到场情况">
					{getFieldDecorator( 'isOnSceneSituation', {
						initialValue: props.isOnSceneSituation ? parseInt( props.isOnSceneSituation ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem label="活动主题" {...config.formItemLayout}>
					{getFieldDecorator( 'activityTheme', {
						initialValue: props.activityTheme,
						rules: [
							{
								required: true,
								message: '必须填写活动主题！'
							},
						],
					} )( <Input placeholder="请输入活动主题" disabled={props.disabled}/> )}
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
				<FormItem label="活动地点" {...config.formItemLayout}>
					{getFieldDecorator( 'activitySite', {
						initialValue: props.activitySite,
						rules: [
							{
								required: true,
								message: '必须填写活动地点！'
							},
						],
					} )( <Input placeholder="请输入活动地点" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="活动时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate', {
						initialValue: props.activityDateStart ? [
							moment( fun.getLocalTime( props.activityDateStart ), 'YYYY-MM-DD HH:00' ),
							moment( fun.getLocalTime( props.activityDateEnd ), 'YYYY-MM-DD HH:00' ) ] : [],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个活动时间段，精确到小时！'
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

export default Form.create()( NewestActivity );