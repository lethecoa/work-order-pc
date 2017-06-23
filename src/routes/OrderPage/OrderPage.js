import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Spin, Row, Col, Form, Button, Modal} from 'antd';
import {action, model, fun, config, modular} from '../../common';
import {
	OrderStep,
	BaseInfo,
	ResidentInfoTable,
	PayModal,
	ResidentSign,
	ResidentInspect,
	Newborn,
	ChronicDisease,
	NewestPolicy,
	NewestActivity,
	AntenatalCare,
	ChildHealth,
	Medication,
	Hypertension,
	Diabetes,
} from '../../components';
import styles from './OrderPage.less';

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
	fun.printLoader( 'orderPage' );
	const { userType, orderHandlerId, orderHandlerName } = user;
	const { currentStep, displayConfirm, submitDisabled, displayBack, displayNew } = orderModel ? orderModel : {};
	const { serviceDetail, residentList } = workerModel ? workerModel : {};
	const { currentData, display, disabled } = workerModel ? workerModel : orderModel;
	const { orgName, remainingBalance } = currentData;

	/** 获取页面path,初始化dataList */
	let path;
	if ( userType === config.userType.worker ) {
		path = route.path.substr( route.path.indexOf( '/' ) + 1 );
		dataList = residentList;
	} else {
		path = route.path;
		if ( !disabled ) {
			dataList = [];
		}
	}

	/** 医生端-校验表单输入数据*/
	const validAndConfirm = () => {
		baseInfo.validateFieldsAndScroll( ( errOut ) => {
			if ( !errOut ) {
				need.validateFieldsAndScroll( ( err ) => {
					if ( !err ) {
						dataList = residentInfoTable.getData();
						if ( dataList === undefined || dataList.length === 0 ) {
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
							fun: payModal.handleOver,
						};
						dispatch( { type: fun.fuse( modular[ path ].model, modular[ path ].action ), payload: result } );
					}
				} );
			}
		} );
	};
	/** 客服端-居民信息数据 */
	const orderData = {
		orderHandlerId,
		orderHandlerName,
		orderId: currentData.orderId,
		residentList: [],
	};
	/** 客服端-保存单条数据 */
	const saveRow = ( index, row ) => {
		orderData.residentList[ 0 ] = row;
		let result = {
			data: orderData,
			type: 'save',
		};
		dispatch( { type: fun.fuse( model.worker, action.worker_saveOrderDetail ), payload: result } );

	};
	/** 客服端-提交单条数据 */
	const submitRow = ( row, callBack ) => {
		orderData.residentList[ 0 ] = row;
		let result = {
			data: orderData,
			callBack: callBack,
			type: 'submit',
		};
		dispatch( { type: fun.fuse( model.worker, action.worker_saveOrderDetail ), payload: result } );
	};
	/** 客服端-返回列表页 */
	const backToList = () => {
		dispatch( routerRedux.push( { pathname: modular.index.url + modular.orderList.url, } ) );
	};
	/** 基本信息参数 */
	const baseInfoProps = {
		path,
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
	/** 居民信息样本参数 */
	const residentInfoProps = {
		name: modular[ path ].name,
		userType: userType,
		monitor: modular[ path ].monitor,
		data: dataList,
		disabled: disabled,
		onSave: ( i, r ) => saveRow( i, r ),
		onSubmit: ( r, callBack ) => submitRow( r, callBack ),
	};
	return (
		<div className={styles.wrap}>
			<Spin spinning={loading}>
				<PayModal ref={e => ( payModal = e )} {...payModalProps} />
				<div className={styles.header}>{modular[ path ].cn + '委托表'}</div>
				{userType === config.userType.doctor ?
					<OrderStep currentStep={currentStep}/>
					:
					<Button size="large" type="primary" className={styles.back} onClick={backToList}>返回</Button>
				}
				<Form onSubmit={showModal}>
					<BaseInfo {...baseInfoProps} ref={e => ( baseInfo = e )}/>
					{path === 'signFamily' ? <ResidentSign disabled={disabled} ref={e => ( need = e )} signSite={orgName}/> : ''}
					{path === 'residentSign' ? <ResidentSign disabled={disabled} ref={e => ( need = e )} signSite={orgName}/> : ''}
					{path === 'workeryyjmqy' ? <ResidentSign disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'residentInspect' ? <ResidentInspect disabled={disabled} ref={e => ( need = e )} examineSite={orgName}/> : ''}
					{path === 'workeryyjmtj' ? <ResidentInspect disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'newborn' ? <Newborn disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryyxsfs' ? <Newborn disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'postpartum' ? <Newborn disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryychfs' ? <Newborn disabled={disabled} {...serviceDetail} /> : ''}

					{path === 'chronicDisease' ? <ChronicDisease disabled={disabled} ref={e => ( need = e )} interviewSite={orgName}/> : ''}
					{path === 'workermbsftz' ? <ChronicDisease disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'newestPolicy' ? <NewestPolicy disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workerzxzctz' ? <NewestPolicy disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'newestActivity' ? <NewestActivity disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workerzxhdtz' ? <NewestActivity disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'antenatalCare' ? <AntenatalCare disabled={disabled} ref={e => ( need = e )} antenatalCareSite={orgName}/> : ''}
					{path === 'workeryfcjtz' ? <AntenatalCare disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'childHealth' ? <ChildHealth disabled={disabled} ref={e => ( need = e )} interviewSite={orgName}/> : ''}
					{path === 'workeretsftz' ? <ChildHealth disabled={disabled} {...serviceDetail} /> : ''}

					{path === 'medication' ? <Medication disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryytx00' ? <Medication disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'curativeEffect' ? <Medication disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workeryylxgz' ? <Medication disabled={disabled} {...serviceDetail} /> : ''}

					{path === 'hypertension' ? <Hypertension disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workergxysf0' ? <Hypertension disabled={disabled} {...serviceDetail} /> : ''}
					{path === 'diabetes' ? <Diabetes disabled={disabled} ref={e => ( need = e )}/> : ''}
					{path === 'workertnbsf0' ? <Diabetes disabled={disabled} {...serviceDetail} /> : ''}

					<ResidentInfoTable {...residentInfoProps} ref={e => ( residentInfoTable = e )}/>
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
										        onClick={function () { location.reload() }}>新建委托单</Button>
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
	return {
		...state,
		loading: state.orderModel ? state.loading.models.orderModel : state.loading.models.workerModel,
		user: state.appModel.user,
	};
};

export default connect( mapStateToProps )( Form.create()( OrderPage ) );
