import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Spin, Row, Col, Form, Button, notification, Modal, Radio} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {
	OrderStep,
	BaseInfo,
	ResidentInfoTable,
	PayModal,
	NewestActivity,
	ResidentSign,
	ResidentInspect,
	Newborn,
	ChronicDisease
} from '../../components';
import styles from './OrderPage.less';

const moduleName = 'orderPage';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let residentInfoTable;
let baseInfo;
let payModal;
let need;

let entrustNumber;
let dataList;
const OrderPage = ( {
	loading,
	orderModel,
	workerModel,
	dispatch,
	route,
	user,
} ) => {
	const { userType, orderHandlerId, orderHandlerName } = user;
	const { currentData, currentStep, display, disabled, displayConfirm, submitDisabled, displayBack, displayNew } = orderModel;
	const { orgName, remainingBalance } = currentData;
	const { pagination, serviceDetail, residentList } = workerModel ? workerModel : {};
	let path;
	if ( userType === config.userType.worker ) {
		path = route.path.substr( route.path.indexOf( '/' ) + 1 );
		dataList = residentList;
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
						dataList = residentInfoTable.getData();
						if ( dataList === undefined ) {
							Modal.error( {
								title: config.NODATA,
							} );
							return;
						}
						entrustNumber = dataList.length;
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
						let result = {
							data: Object.assign( values, valuesOut, { expenseAccount, residentQueryDtoList: dataList } ),
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
	const saveRow = ( index, row ) => {
		orderData.residentList[ 0 ] = row;
		let result = {
			data: orderData,
			fun: openNotificationWithIcon,
		};
		dispatch( { type: fun.fuse( model.worker, action.worker_saveOrderDetail ), payload: result } );

	};
	/** 客服端-提交单条数据 */
	const submitRow = ( index, row ) => {
		orderData.residentList[ 0 ] = row;
		orderData.residentList[ 0 ].status = 2;
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
					{path === 'newestActivity' ? <NewestActivity disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workerzxhdtz' ? <NewestActivity disabled={disabled} {...serviceDetail}/> : ''}
					{path === 'residentSign' ? <ResidentSign disabled={disabled} ref={e => ( need = e )} signSite={orgName}/> : ''}
					{path === 'workeryyjmqy' ? <ResidentSign disabled={disabled} {...serviceDetail}/> : ''}
					{path === 'residentInspect' ? <ResidentInspect disabled={disabled} ref={e => ( need = e )} examineSite={orgName}/> : ''}
					{path === 'workeryyjmtj' ? <ResidentInspect disabled={disabled} {...serviceDetail}/> : ''}
					{path === 'newborn' ? <Newborn disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryyxsfs' ? <Newborn disabled={disabled} {...serviceDetail}/> : ''}
					{path === 'postpartum' ? <Newborn disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryychfs' ? <Newborn disabled={disabled} {...serviceDetail}/> : ''}
					{path === 'chronicDisease' ? <ChronicDisease disabled={disabled} ref={e => ( need = e )} interviewSite={orgName}/> : ''}
					{path === 'workermbsftz' ? <ChronicDisease disabled={disabled} {...serviceDetail}/> : ''}
					<ResidentInfoTable name={modular[ path ].name} userType={userType} monitor={1}
					                   data={dataList} onSave={e => saveRow( e )} onSubmit={e => submitRow( e )}
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

export default connect( mapStateToProps )( Form.create()( OrderPage ) );
