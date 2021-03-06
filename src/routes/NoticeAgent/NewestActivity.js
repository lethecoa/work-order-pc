import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Spin, Row, Col, Form, Input, Button, notification, Modal, Radio} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {OrderStep, BaseInfo, ResidentInfoTable, PayModal, NewestActivity2} from '../../components';
import styles from './NewestPolicy.less';
//import VisibleTodoList from '../actions'
const moduleName = modular.getModuleName( modular.newestActivity );
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let residentInfoTable;
let baseInfo;
let payModal;
let need;

let entrustNumber;

const NewestActivity = ( {
	loading,
	orderModel,
	workerModel,
	form,
	dispatch,
	route,
	user,
} ) => {
	const { userType, orderHandlerId, orderHandlerName } = user;
	const { currentData, currentStep, display, disabled, displayConfirm, submitDisabled, displayBack, displayNew } = orderModel;
	const { remainingBalance } = currentData;
	const { pagination, serviceDetail, residentList } = workerModel ? workerModel : {};
	const { policyContent } = serviceDetail ? serviceDetail : {};
	let path;
	if ( userType === config.userType.worker ) {
		path = route.path.substr( route.path.indexOf( '/' ) + 1 );
	} else {
		path = route.path;
	}
	const orderData = {
		orderHandlerId,
		orderHandlerName,
		orderId: currentData.orderId,
		residentList: [],
	};
	/** 医生端-校验表单输入数据*/
	const validAndConfirm = () => {
		baseInfo.validateFieldsAndScroll( ( err ) => {
			if ( !err ) {
				need.validateFieldsAndScroll( ( err ) => {
					if ( !err ) {
						let data = residentInfoTable.getData();
						if ( data === undefined ) {
							Modal.error( {
								title: config.NODATA,
							} );
							return;
						}
						entrustNumber = data.length;
						dispatch( { type: fun.fuse( model.order, action.order_changeConfirmState ) } );
					}
				} );
			}
		} );
	};
	/** 医生端-显示确认支付窗口 */
	const showModal = ( e ) => {
		e.preventDefault();
		dispatch( {
			type: fun.fuse( model.app, action.APP_getItemPrice ),
			payload: { itemId: modular[ path ].ritRef, fun: payModal.showModal }
		} );
	};
	/** 医生端-提交表单数据 */
	const handleSubmit = ( expenseAccount ) => {
		baseInfo.validateFieldsAndScroll( ( errOut, valuesOut ) => {
			if ( !errOut ) {
				need.validateFieldsAndScroll( ( err, values ) => {
					if ( !err ) {
						let residentQueryDtoList = residentInfoTable.getData();
						let result = {
							data: Object.assign( values, valuesOut, { expenseAccount, residentQueryDtoList } ),
							fun: openNotificationWithIcon,
						};
						dispatch( { type: fun.fuse( modular[ path ].model, modular[ path ].action ), payload: result } );
					}
				} );
			}
		} );
	};
	/** 客服端-切换显示已处理、未处理记录 */
	const handlerRadioChange = ( e ) => {
		const values = {};
		values.status = e.target.value;
		values.orderId = currentData.orderId;
		dispatch( {
			type: fun.fuse( model.worker, action.worker_getOrderDetail ),
			payload: { status: values.status, url: modular[ path ].url, orderId: values.orderId }
		} );
	};
	/** 客服端-保存单条数据 */
	const saveRow = ( row ) => {
		orderData.residentList[ 0 ] = row;
		let result = {
			data: orderData,
			fun: openNotificationWithIcon,
		};
		dispatch( { type: fun.fuse( model.worker, action.worker_saveOrderDetail ), payload: result } );

	};
	/** 客服端-提交单条数据 */
	const submitRow = ( row ) => {
		orderData.residentList[ 0 ] = row;
		orderData.residentList[0].status = 2;
		let result = {
			data: orderData,
			fun: openNotificationWithIcon,
		};
		dispatch( { type: fun.fuse( model.worker, action.worker_saveOrderDetail ), payload: result } );
	};
	/** 客服端-返回列表页 */
	const backToList = () => {
		dispatch( routerRedux.push( { pathname: modular.index.url + modular.orderList.url, query: pagination, } ) );
	};
	/** 显示提交结果 */
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
	/** 基本信息参数 */
	const baseInfoProps = {
		...currentData,
		entrustNumber: currentData.entrustNumber ? currentData.entrustNumber : entrustNumber,
		display: display,
		disabled: disabled,
	};
	/** 确认支付窗口参数 */
	const payModalProps = {
		handleSubmit: handleSubmit,
		remainingBalance: remainingBalance,
	};

	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<PayModal ref={e => ( payModal = e )} {...payModalProps}/>
				{userType === config.userType.doctor ?
					<div>
						<div className={styles.header}>{modular[ path ].cn + '委托表'}</div>
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
					{path === 'newestActivity' ? <NewestActivity2 disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workerzxhdtz' ? <NewestActivity2 disabled={disabled} {...serviceDetail}/> : ''}
					<ResidentInfoTable name={modular[ path ].name} userType={userType} monitor={1}
					                   data={residentList} onSave={e => saveRow( e )} onSubmit={e => submitRow( e )}
					                   disabled={disabled} ref={e => ( residentInfoTable = e )}/>
					{userType === config.userType.doctor ?
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
		user: state.appModel.user,
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
export default connect( mapStateToProps )( Form.create()( NewestActivity ) );
