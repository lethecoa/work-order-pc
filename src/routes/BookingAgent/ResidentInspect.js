import React from 'react';
import {connect} from 'dva';
import {Row, Col, Form, DatePicker, Input, Radio, Select, Button, notification, Modal, Checkbox} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal, CarryMaterial} from '../../components';
import styles from './ResidentInspect.less';

const moduleName = modular.getModuleName( modular.residentInspect );
const FormItem = Form.Item;
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

let residentInfoTable;
let baseInfo;
let payModal;

let entrustNumber;

const ResidentInspect = ( {
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
	const { doctorId, doctorName, doctorTel, orgName, remainingBalance } = appModel.user;
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
			<div className={styles.header}>预约居民体检委托表</div>
			<OrderStep currentStep={currentStep}/>
			<Form onSubmit={showModal}>
				<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
				<div className={styles.need}>
					<div className={styles.title}>需求说明</div>
					<div className={styles.form}>
						<FormItem label="预约体检项目" {...config.formItemLayout}>
							{getFieldDecorator( 'examineItem', {
								rules: [
									{
										required: true,
										message: '请至少选择其中一项！'
									},
								],
							} )( <CheckboxGroup options={materialOptions} disabled={disabled}/> )}
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
							} )( <CarryMaterial disabled={disabled}/> )}
						</FormItem>
						<FormItem {...config.formItemLayout} label="体检注意事项">
							{getFieldDecorator( 'announcements', { initialValue: 1 } )(
								<RadioGroup disabled={disabled}>
									<Radio value={1}>空腹：晚上10点后不摄入食物</Radio>
									<Radio value={0}>无</Radio>
								</RadioGroup>
							)}
						</FormItem>
						<FormItem label="体检地点" {...config.formItemLayout}>
							{getFieldDecorator( 'examineSite', {
								initialValue: orgName,
								rules: [
									{
										required: true,
										message: '必须填写体检地点！'
									},
								],
							} )( <Input placeholder="请输入您希望的体检地点" disabled={disabled}/> )}
						</FormItem>
						<FormItem label="预约体检时间" {...config.formItemLayout}
						          help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
							{getFieldDecorator( 'allowDate', {
								rules: [
									{
										required: true,
										type: 'array',
										message: '请选择一个体检的时间段，精确到小时！'
									},
								],
							} )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" disabled={disabled}/> )}
						</FormItem>
						<FormItem {...config.formItemLayout} label="体检是否免费">
							{getFieldDecorator( 'isFree', { initialValue: 0 } )(
								<RadioGroup disabled={disabled}>
									<Radio value={1}>是</Radio>
									<Radio value={0}>否</Radio>
								</RadioGroup>
							)}
						</FormItem>
						<FormItem {...config.formItemLayout} label="其他要求">
							{getFieldDecorator( 'otherRequirements', { initialValue: '' } )(
								<Input type="textarea" rows={4} placeholder="请在此输入您的其它要求" disabled={disabled}/>
							)}
						</FormItem>
					</div>
				</div>
				<ResidentInfoTable name={modular.signFamily.name} ref={e => ( residentInfoTable = e )}/>
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
			dispatch( { type: fun.fuse( model.bookingAgent, action.BA_savePhysicalExam ), payload: values } );
		},
		changeConfirmState: () => {
			dispatch( { type: fun.fuse( model.bookingAgent, action.BA_changeConfirmState ) } );
		},
		showModal: ( e ) => {
			e.preventDefault();
			dispatch( {
				type: fun.fuse( model.app, action.APP_getItemPrice ),
				payload: { itemId: modular.residentInspect.ritRef, fun: payModal.showModal }
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
export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( ResidentInspect ) );
