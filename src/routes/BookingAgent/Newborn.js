import React from 'react';
import {connect} from 'dva';
import {Row, Col, Form, DatePicker, Input, Radio, Select, Button, notification, Modal, Checkbox} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal} from '../../components';
import styles from './Newborn.less';

const moduleName = modular.getModuleName( modular.newborn );
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

let residentInfoTable;
let baseInfo;
let payModal;

let entrustNumber;

const Newborn = ( {
	loading,
	appModel,
	bookingAgentModel,
	form,
	onSubmit,
	changeConfirmState,
	showModal,
	openNotificationWithIcon,
} ) => {
	const { validateFieldsAndScroll, getFieldDecorator } = form;
	const { doctorId, doctorName, doctorTel, remainingBalance } = appModel.user;
	const { currentStep, display, disabled, displayConfirm, submitDisabled, displayBack, displayNew } = bookingAgentModel;

	const handleSubmit = ( expenseAccount ) => {
		baseInfo.validateFieldsAndScroll( ( errOut, valuesOut ) => {
			if ( !errOut ) {
				validateFieldsAndScroll( ( err, values ) => {
					if ( !err ) {
						onSubmit( {
							data: Object.assign( {}, values, valuesOut, { doctorId, doctorName, doctorTel }, { expenseAccount: expenseAccount } ),
							fun: openNotificationWithIcon
						} );
					}
				} );
			}
		} );
	};

	const validAndConfirm = () => {
		baseInfo.validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				validateFieldsAndScroll( ( err ) => {
					if ( !err ) {
						entrustNumber = residentInfoTable.getData().length;
						//TODO 如果居民信息样本为空的提示
						changeConfirmState();
					}
				} );
			}
		} );
	};
	const baseInfoProps = {
		...appModel.user,
		entrustNumber: entrustNumber,
		display: display,
		disabled: disabled,
	};

	const payModalProps = {
		handleSubmit: handleSubmit,
		remainingBalance: remainingBalance,
	};

	return (
		<div className={styles.wrap}>
			<PayModal ref={e => ( payModal = e )} {...payModalProps}/>
			<div className={styles.header}>预约新生儿家庭访视委托表</div>
			<OrderStep currentStep={currentStep}/>
			<Form onSubmit={showModal}>
				<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
				<div className={styles.need}>
					<div className={styles.title}>需求说明</div>
					<div className={styles.form}>
						<FormItem {...config.formItemLayout} label="访视检查内容">
							{getFieldDecorator( 'examineContent', {
								rules: [
									{
										required: true,
										message: '请输入访视检查内容！'
									},
								],
							} )( <Input type="textarea" rows={4} placeholder="请在此输入访视检查内容" disabled={disabled}/> )}
						</FormItem>
						<FormItem label="上午访视时间" {...config.formItemLayout}
						          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
							{getFieldDecorator( 'allowDate_am', {
								rules: [
									{
										required: true,
										type: 'array',
										message: '请选择一个时间段，精确到小时！'
									},
								],
							} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={disabled}/> )}
						</FormItem>
						<FormItem label="下午访视时间" {...config.formItemLayout}
						          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
							{getFieldDecorator( 'allowDate_pm', {
								rules: [
									{
										required: true,
										type: 'array',
										message: '请选择一个时间段，精确到小时！'
									},
								],
							} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={disabled}/> )}
						</FormItem>
						<FormItem {...config.formItemLayout} label="是否收费">
							{getFieldDecorator( 'isCharge', { initialValue: 0 } )(
								<RadioGroup disabled={disabled}>
									<Radio value={1}>是</Radio>
									<Radio value={0}>否</Radio>
								</RadioGroup>
							)}
						</FormItem>
						<FormItem label="预约人数" {...config.formItemLayout}>
							{getFieldDecorator( 'appointmentNumberIllustration', {
								rules: [
									{
										required: true,
										message: '必须填写预约人数！'
									},
								],
							} )( <Input placeholder="如：上午可预约3人，下午可预约5人" disabled={disabled}/> )}
						</FormItem>
					</div>
				</div>
				<ResidentInfoTable name={modular.newborn.name} ref={e => ( residentInfoTable = e )}/>
				<div className={styles.submit} style={{ display: displayConfirm }}>
					<Button size="large" type="primary" onClick={validAndConfirm}>提交我的委托单信息</Button>
				</div>
				<div className={styles.submit} style={{ display: display }}>
					<Row>
						<Col span={12}>
							<Button size="large" type="primary" htmlType="submit" style={{ width: 200 }} disabled={submitDisabled} loading={loading}>确认委托并支付</Button>
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
			let residentInfo = residentInfoTable.getData();
			values.data.entrustNumber = residentInfo.length;
			values.data.residentQueryDtoList = residentInfo;
			dispatch( { type: fun.fuse( model.bookingAgent, action.BA_saveNewBorn ), payload: values } );
		},
		changeConfirmState: () => {
			dispatch( { type: fun.fuse( model.bookingAgent, action.BA_changeConfirmState ) } );
		},
		showModal: ( e ) => {
			e.preventDefault();
			dispatch( {
				type: fun.fuse( model.app, action.APP_getItemPrice ),
				payload: { itemId: modular.newborn.ritRef, fun: payModal.showModal }
			} );
		},
		openNotificationWithIcon: ( data ) => {
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
		},
	}
};
export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( Newborn ) );
