import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Spin, Row, Col, Form, Input, Button, notification, Modal, Radio} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal} from '../../components';
import styles from './NewestPolicy.less';
//import VisibleTodoList from '../actions'
const moduleName = modular.getModuleName( modular.newestPolicy );
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let residentInfoTable;
let baseInfo;
let payModal;

let entrustNumber;

const NewestPolicy = ( {
	loading,
	orderModel,
	workerModel,
	form,
	dispatch,
} ) => {
	const { validateFieldsAndScroll, getFieldDecorator } = form;
	const { currentData, currentStep, display, disabled, displayConfirm, submitDisabled, displayBack, displayNew } = orderModel;
	const { userType, doctorId, doctorName, doctorTel, remainingBalance } = currentData;
	const { pagination, serviceDetail, residentList } = workerModel ? workerModel : {};
	const { policyContent } = serviceDetail ? serviceDetail : {};

	const handleSubmit = ( expenseAccount ) => {
		baseInfo.validateFieldsAndScroll( ( errOut, valuesOut ) => {
			if ( !errOut ) {
				validateFieldsAndScroll( ( err, values ) => {
					if ( !err ) {
						// onSubmit( {
						// 	data: Object.assign( {}, values, valuesOut, { doctorId, doctorName, doctorTel, expenseAccount } ),
						// 	fun: openNotificationWithIcon
						// } );
						let residentInfo = residentInfoTable.getData();
						let result = {};
						result.data = Object.assign( {}, values, valuesOut, {
							doctorId,
							doctorName,
							doctorTel,
							expenseAccount
						}, { entrustNumber: residentInfo.length, residentQueryDtoList: residentInfo } );
						//values.data.entrustNumber = residentInfo.length;
						//values.data.residentQueryDtoList = residentInfo;
						result.fun = openNotificationWithIcon;
						dispatch( { type: fun.fuse( model.noticeAgent, action.NA_savePolicy ), payload: result } );
					}
				} );
			}
		} );
	};

	const validAndConfirm = (e) => {
		console.log(residentInfoTable)
		//test();
		baseInfo.validateFieldsAndScroll( ( err ) => {
			if ( !err ) {
				validateFieldsAndScroll( ( err ) => {
					if ( !err ) {
						//entrustNumber = residentInfoTable.getData().length;
						//TODO 如果居民信息样本为空的提示
						//changeConfirmState();
						dispatch( { type: fun.fuse( model.order, action.order_changeConfirmState ) } );
					}
				} );
			}
		} );
	};
	const handlerRadioChange = ( e ) => {
		const values = {};
		values.status = e.target.value;
		values.orderId = currentData.orderId;
		dispatch( {
			type: fun.fuse( model.worker, action.worker_getOrderDetail ),
			payload: { status: values.status, url: modular.worker + modular.newestPolicy.ritRef, orderId: values.orderId }
		} );
	};
	const backToList = () => {
		dispatch( routerRedux.push( { pathname: modular.index.url + modular.orderList.url, query: pagination, } ) );
	};
	const showModal = ( e ) => {
		e.preventDefault();
		dispatch( {
			type: fun.fuse( model.app, action.APP_getItemPrice ),
			payload: { itemId: modular.newestPolicy.ritRef, fun: payModal.showModal }
		} );
	};
	const openNotificationWithIcon = ( data ) => {
		payModal.handleOver();
		if ( data.success ) {
			notification[ 'success' ]( {
				message: config.SUCCESS,
			} );
		} else {
			Modal.error( {
				title: data.message,
			} );
		}
	};
	/** 保存单条数据 */
	const saveRow = ( row ) => {
		console.log( '================= save: ', row );
	}
	/** 提交单条数据 */
	const submitRow = ( row ) => {
		console.log( '================= submit: ', row );
	}
	const baseInfoProps = {
		...currentData,
		entrustNumber: currentData.entrustNumber ? currentData.entrustNumber : entrustNumber,
		display: display,
		disabled: disabled,
	};
	const payModalProps = {
		handleSubmit: handleSubmit,
		remainingBalance: remainingBalance,
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<PayModal ref={e => ( payModal = e )} {...payModalProps}/>
				{userType === 'doctor' ?
					<div>
						<div className={styles.header}>最新政策通知委托表</div>
						<OrderStep currentStep={currentStep}/>
					</div>
					:
					<div className={styles.center}>
						<RadioGroup className={styles.radioTab} defaultValue="1" onChange={handlerRadioChange}>
							<RadioButton value="1">待处理</RadioButton>
							<RadioButton value="2">已处理</RadioButton>
						</RadioGroup>
						<Button size="large" type="primary" className={styles.fRight} onClick={backToList}>返回</Button>
					</div>
				}
				<Form onSubmit={showModal}>
					<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
					<div className={styles.need}>
						<div className={styles.title}>需求说明</div>
						<div className={styles.form}>
							<FormItem {...config.formItemLayout} label="政策内容">
								{getFieldDecorator( 'policyContent', {
									initialValue: policyContent,
									rules: [
										{
											required: true,
											message: '请输入政策内容！'
										},
									]
								} )(
									<Input type="textarea" rows={8} placeholder="请输入政策内容：如政策下发时间、下发内容、需要居民配合的事项等" disabled={disabled}/>
								)}
							</FormItem>
						</div>
					</div>
					<ResidentInfoTable name={modular.newestPolicy.name} userType={userType} monitor={1}
					                   data={residentList} onSave={e => saveRow( e )} onSubmit={e => submitRow( e )}
					                   disabled={disabled} ref={e => ( residentInfoTable = e )} />
					{userType === 'doctor' ?
						<div>
							<div className={styles.submit} style={{ display: displayConfirm }}>
								<Button size="large" type="primary" onClick={validAndConfirm}>提交我的委托单信息</Button>
							</div>
							<div className={styles.submit} style={{ display: display }}>
								<Row>
									<Col span={12}>
										<Button size="large" type="primary" htmlType="submit" style={{ width: 200 }} disabled={submitDisabled}
										        loading={loading}>确认委托并支付</Button>
									</Col>
									<Col span={12}>
										<Button size="large" type="primary" style={{ width: 200, display: displayBack }} onClick={validAndConfirm}>返回修改</Button>
										<Button size="large" type="primary" style={{ width: 200, display: displayNew }}
										        onClick={function () {location.reload()}}>新建委托单</Button>
									</Col>
								</Row>
							</div>
						</div> : ''}
				</Form>
			</Spin>
		</div>
	);
};

const mapStateToProps = ( state ) => {
	fun.print( state, 'state', moduleName );
	return {
		...state,
		loading: state.loading.models.orderModel,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		dispatch
		// onStatusChange: ( values ) => {
		// 	dispatch( {
		// 		type: fun.fuse( model.worker, action.worker_getOrderDetail ),
		// 		payload: { status: values.status, url: modular.worker + modular.newestPolicy.ritRef, orderId: values.orderId }
		// 	} );
		// },
		// reloadList: ( pagination ) => {
		// 	dispatch( routerRedux.push( { pathname: modular.index.url + modular.orderList.url, query: pagination, } ) );
		// },
		// onSubmit: ( values ) => {
		// 	let residentInfo = residentInfoTable.getData();
		// 	values.data.entrustNumber = residentInfo.length;
		// 	values.data.residentQueryDtoList = residentInfo;
		// 	dispatch( { type: fun.fuse( model.noticeAgent, action.NA_savePolicy ), payload: values } );
		// },
		// changeConfirmState: () => {
		// 	dispatch( { type: fun.fuse( model.order, action.order_changeConfirmState ) } );
		// },
		// showModal: ( e ) => {
		// 	e.preventDefault();
		// 	dispatch( {
		// 		type: fun.fuse( model.app, action.APP_getItemPrice ),
		// 		payload: { itemId: modular.newestPolicy.ritRef, fun: payModal.showModal }
		// 	} );
		// },
		// openNotificationWithIcon: ( data ) => {
		// 	payModal.handleOver();
		// 	if ( data.success ) {
		// 		notification[ 'success' ]( {
		// 			message: '提交成功',
		// 		} );
		// 	} else {
		// 		Modal.error( {
		// 			title: data.message,
		// 		} );
		// 	}
		// },
	}
};
export default connect( mapStateToProps )( Form.create()( NewestPolicy ) );
