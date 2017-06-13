import React from 'react';
import {connect} from 'dva';
import {Row, Col, Form, DatePicker, Input, Radio, Checkbox, Select, Button, notification, Modal} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal} from '../../components';
import styles from './SignFamily.less';

const moduleName = modular.getModuleName( modular.signFamily );
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;

let residentInfoTable;
let baseInfo;
let entrustNumber;
let currentStep = 0;
let display = 'none';
let disabled = false;
let submitDisabled=false;
let displayConfirm = 'block';
let displayBack = 'block';
let displayNew = 'none';
let payModal;
let expenseAccount = 0.0;
const SignFamily = ( {
	appModel,
	form,
	onSubmit,
} ) => {
	const { validateFieldsAndScroll, getFieldDecorator } = form;
	const { doctorId, doctorName, doctorTel, orgName, remainingBalance } = appModel.user;

	const baseInfoProps = {
		...appModel.user,
		entrustNumber: entrustNumber,
		display: display,
		disabled: disabled,
	};

	const openNotificationWithIcon = ( data ) => {
		payModal.handleOver();
		if ( data.success ) {
			notification[ 'success' ]( {
				message: '提交成功',
			} );
		} else {
			Modal.error( {
				title: data.message,
			} );
		}
	};

	const showModal = ( e ) => {
		e.preventDefault();
		payModal.showModal();
	};
	const handleSubmit = () => {
		baseInfo.validateFieldsAndScroll( ( errOut, valuesOut ) => {
			if ( !errOut ) {
				validateFieldsAndScroll( ( err, values ) => {
					if ( !err ) {
						let residentInfo = residentInfoTable.getData();
						values.doctorId = doctorId;
						values.doctorName = doctorName;
						values.doctorTel = doctorTel;
						values.taskDeadlineDate = valuesOut.taskDeadlineDate._d;
						values.entrustNumber = residentInfo.length;
						values.carryMaterial = values.carryMaterial.join( ',' );
						values.agreementDateStart = values.allowDate[ 0 ]._d;
						values.agreementDateEnd = values.allowDate[ 1 ]._d;
						values.expenseAccount = expenseAccount;
						values.residentQueryDtoList = residentInfo;
						values.fun = openNotificationWithIcon;
						currentStep = 3;
						displayBack = 'none';
						displayNew = 'block';
						submitDisabled=true;
						onSubmit( values );
					}
				} );
			}
		} );
	};
	const payModalProps = {
		handleSubmit: handleSubmit,
		expenseAccount: expenseAccount,
		remainingBalance: remainingBalance,
	};
	const validAndConfirm = () => {
		baseInfo.validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				validateFieldsAndScroll( ( err ) => {
					if ( !err ) {
						entrustNumber = residentInfoTable.getData().length;
						//TODO 如果居民信息样本为空的提示
						currentStep = currentStep == 1 ? 0 : 1;
						display = display == 'none' ? 'block' : 'none';
						disabled = !disabled;
						displayConfirm = displayConfirm == 'none' ? 'block' : 'none';
					}
				} );
			}
		} );
	};

	return (
		<div className={styles.wrap}>
			<PayModal ref={e => ( payModal = e )} {...payModalProps}/>
			<div className={styles.header}>预约居民签约委托表</div>
			<OrderStep currentStep={currentStep}/>
			<Form onSubmit={showModal}>
				<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
				<div className={styles.need}>
					<div className={styles.title}>需求说明</div>
					<FormItem {...config.formItemLayout} label="是否告知签约流程">
						{getFieldDecorator( 'isInformSignFlow', { initialValue: 0 } )(
							<RadioGroup disabled={disabled}>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
								（参照国家指导建议）
							</RadioGroup>
						)}
					</FormItem>
					<FormItem {...config.formItemLayout} label="是否告知签约益处">
						{getFieldDecorator( 'isInformSignBenefit', { initialValue: 0 } )(
							<RadioGroup disabled={disabled}>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
								（参照国家指导建议）
							</RadioGroup>
						)}
					</FormItem>
					<FormItem label="所需携带材料" {...config.formItemLayout}>
						{getFieldDecorator( 'carryMaterial', {
							initialValue: [ 0 ],
							rules: [
								{
									required: true,
									message: '请至少选择其中一项！'
								},
							],
						} )( <CheckboxGroup disabled={disabled} options={config.materialOptions}/> )}
					</FormItem>

					<FormItem label="签约地点" {...config.formItemLayout}>
						{getFieldDecorator( 'signSite', {
							initialValue: orgName,
							rules: [
								{
									required: true,
									message: '必须填写签约地点！'
								},
							],
						} )( <Input placeholder="请输入您希望的签约地点" disabled={disabled}/> )}
					</FormItem>
					<FormItem label="领取协议或者缴费时间" {...config.formItemLayout}
					          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
						{getFieldDecorator( 'allowDate', {
							rules: [
								{
									required: true,
									type: 'array',
									message: '请选择一个签约的时间段，精确到小时！'
								},
							],
						} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={disabled}/> )}
					</FormItem>
					<FormItem {...config.formItemLayout} label="其他要求">
						{getFieldDecorator( 'otherRequirements', { initialValue: '' } )(
							<Input type="textarea" rows={4} placeholder="请在此输入您的其它要求" disabled={disabled}/>
						)}
					</FormItem>
				</div>
				<ResidentInfoTable name={modular.signFamily.name} ref={e => ( residentInfoTable = e )}/>
				<div className={styles.submit} style={{ display: displayConfirm }}>
					<Button size="large" type="primary" onClick={validAndConfirm}>提交我的委托单信息</Button>
				</div>
				<div className={styles.submit} style={{ display: display }}>
					<Row>
						<Col span={12}>
							<Button size="large" type="primary" htmlType="submit" style={{ width: 200 }} disabled={submitDisabled}>确认委托并支付</Button>
						</Col>
						<Col span={12}>
							<Button size="large" type="primary" style={{ width: 200, display: displayBack }} onClick={validAndConfirm}>返回修改</Button>
							<Button size="large" type="primary" style={{ width: 200, display: displayNew }} onClick={function () {location.reload()}}>新建委托单</Button>
						</Col>
					</Row>
				</div>
			</Form>
		</div>
	);
};

const mapStateToProps = ( state ) => {
	fun.print( state, 'state', moduleName );
	return {
		...state,
		loading: state.loading.models.appModel,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		onSubmit: ( values ) => {
			fun.print( values, 'onSubmit', moduleName );
			dispatch( { type: fun.fuse( model.bookingAgent, action.BA_onSubmit ), payload: values } );
		}
	}
}
export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( SignFamily ) );
