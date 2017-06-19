import React from 'react';
import {Form, DatePicker, Input, Radio} from 'antd';
import moment from 'moment';
import {config, fun} from '../../../common';
import CarryMaterial from '../../formItme/CarryMaterial/CarryMaterial';
import styles from './ResidentSign.less';

const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

function ResidentSign( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;
	console.log( fun.getLocalTime( props.agreementDateStart ) )
	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="是否告知签约流程">
					{getFieldDecorator( 'isInformSignFlow', {
						initialValue: props.isInformSignFlow ? parseInt( props.isInformSignFlow ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
							（参照国家指导建议）
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...config.formItemLayout} label="是否告知签约益处">
					{getFieldDecorator( 'isInformSignBenefit', {
						initialValue: props.isInformSignBenefit ? parseInt( props.isInformSignBenefit ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
							（参照国家指导建议）
						</RadioGroup>
					)}
				</FormItem>
				//TODO
				<FormItem label="所需携带材料" {...config.formItemLayout}>
					{getFieldDecorator( 'carryMaterial', {
						initialValue: props.carryMaterial ? props.carryMaterial.split( ',' ) : [ 0 ],
						rules: [
							{
								required: true,
								message: '请至少选择其中一项！'
							},
						],
					} )( <CarryMaterial disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="签约地点" {...config.formItemLayout}>
					{getFieldDecorator( 'signSite', {
						initialValue: props.signSite,
						rules: [
							{
								required: true,
								message: '必须填写签约地点！'
							},
						],
					} )( <Input placeholder="请输入您希望的签约地点" disabled={props.disabled}/> )}
				</FormItem>
				<FormItem label="领取协议或者缴费时间" {...config.formItemLayout}
				          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
					{getFieldDecorator( 'allowDate', {
						initialValue: [
							props.agreementDateStart ? moment( fun.getLocalTime( props.agreementDateStart ), 'YYYY-MM-DD HH:00' ) : undefined,
							props.agreementDateEnd ? moment( fun.getLocalTime( props.agreementDateEnd ), 'YYYY-MM-DD HH:00' ) : undefined ],
						rules: [
							{
								required: true,
								type: 'array',
								message: '请选择一个签约的时间段，精确到小时！'
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

export default Form.create()( ResidentSign );