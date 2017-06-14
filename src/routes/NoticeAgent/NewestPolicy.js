import React from 'react';
import {connect} from 'dva';
import {Row, Col, Form, DatePicker, Input, Radio, Select, Button, notification, Modal} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal, CarryMaterial} from '../../components';
import styles from './NewestPolicy.less';

const moduleName = modular.getModuleName( modular.newestPolicy );
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

let residentInfoTable;
let baseInfo;
let payModal;

let entrustNumber;

const NewestPolicy = ( {
	loading,
	appModel,
	orderModel,
	form,
	onSubmit,
	changeConfirmState,
	showModal,
	openNotificationWithIcon,
} ) => {
	const { validateFieldsAndScroll, getFieldDecorator } = form;
	const { doctorId, doctorName, doctorTel, orgName, remainingBalance } = appModel.user;
	const { currentStep, display, disabled, displayConfirm, submitDisabled, displayBack, displayNew } = orderModel;

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
			<div className={styles.header}>最新政策通知委托表</div>
			<OrderStep currentStep={currentStep}/>
			<Form onSubmit={showModal}>
				<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
				<div className={styles.need}>
					<div className={styles.title}>需求说明</div>
					<div className={styles.form}>
						<FormItem {...config.formItemLayout} label="政策内容">
							{getFieldDecorator( 'policyContent', {
								initialValue: '',
								rules: [
									{
										required: true,
										message: '请输入政策内容！'
									},
								]} )(
								<Input type="textarea" rows={8} placeholder="请输入政策内容：如政策下发时间、下发内容、需要居民配合的事项等" disabled={disabled}/>
							)}
						</FormItem>
					</div>
				</div>
				<ResidentInfoTable name={modular.newestPolicy.name} ref={e => ( residentInfoTable = e )}/>
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
			//dispatch( { type: fun.fuse( model.bookingAgent, action.BA_saveSign ), payload: values } );
		},
		changeConfirmState: () => {
			dispatch( { type: fun.fuse( model.orderModel, action.order_changeConfirmState ) } );
		},
		showModal: ( e ) => {
			e.preventDefault();
			dispatch( {
				type: fun.fuse( model.app, action.APP_getItemPrice ),
				payload: { itemId: modular.newestPolicy.ritRef, fun: payModal.showModal }
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
export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( NewestPolicy ) );
