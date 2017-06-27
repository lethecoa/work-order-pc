import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Form, Select, DatePicker, Button, Table, Pagination, Radio} from 'antd';
import {HypertensionA,HypertensionB,HypertensionC,DiabetesA,DiabetesB,DiabetesC} from '../../components';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../common';
import styles from './OrderList.less';

const moduleName = modular.getModuleName( modular.orderList );
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let  hypertensionA;
let  hypertensionB;
let  hypertensionC;

let  diabetesA;
let  diabetesB;
let  diabetesC;

const columns = [ {
	title: '序号',
	dataIndex: 'rownum',
	key: 'rownum',
	className: styles.center,
}, {
	title: '项目',
	dataIndex: 'itemName',
	key: 'itemName',
	width: '20%',
}, {
	title: '机构',
	dataIndex: 'orgName',
	key: 'orgName',
}, {
	title: '姓名',
	dataIndex: 'doctorName',
	key: 'doctorName',
}, {
	title: '联系方式',
	dataIndex: 'doctorTel',
	key: 'doctorTel',
}, {
	title: '时间截点',
	dataIndex: 'taskDeadlineDate',
	key: 'taskDeadlineDate',
}, {
	title: '人数',
	dataIndex: 'entrustNumber',
	key: 'entrustNumber',
} ];

const OrderList = ( {
	form,
	loading,
	workerModel,
	dispatch,
} ) => {
	/*fun.printLoader( 'orderList' );*/
	const { resetFields, validateFieldsAndScroll, getFieldDecorator } = form;
	const { pagination, list: dataSource, total } = workerModel;
	/** 查询 */
	const search = ( values ) => {
		if ( values.allowDate[ 0 ] && values.allowDate[ 1 ] ) {
			values.dateStart = values.allowDate[ 0 ].format( 'YYYY-MM-DD' );
			values.dateEnd = values.allowDate[ 1 ].format( 'YYYY-MM-DD' );
		}
		delete(values[ "allowDate" ]);
		dispatch( { type: fun.fuse( model.worker, action.worker_getOrders ), payload: values } );
	};
	/** 列表行点击 */
	const handlerRowClick = ( record, index ) => {
		dispatch( {
			type: fun.fuse( model.worker, action.worker_getOrderDetail ),
			payload: { order: record, url: modular.worker + record.itemId }
		} );
	};
	/** 点击查询按钮 */
	const handlerSubmit = ( e ) => {
		e.preventDefault();
		validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				search( values );
			}
		} );
	};
	/** 切换已处理、未处理 */
	const handlerRadioChange = ( e ) => {
		resetFields();
		dispatch( { type: fun.fuse( model.worker, action.worker_getOrders ), payload: { status: e.target.value } } );
	};
	/** 翻页 */
	const handlerPageChange = ( page ) => {
		validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				values.page = page;
				search( values );
			}
		} );
	};

  /** 获取HypertensionA组件的数据 */
  const GetHypertensionA = ( e ) => {
    e.preventDefault();
    hypertensionA.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        values.medicationInfo=hypertensionA.instances.medicationInfo.state.dataSource;
        console.log(values);
      }
    } );
  };

  /** 获取HypertensionB组件的数据 */
  const GetHypertensionB = ( e ) => {
    e.preventDefault();
    hypertensionB.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        console.log(values);
      }
    } );
  };

  /** 获取HypertensionC组件的数据 */
  const GetHypertensionC = ( e ) => {
    e.preventDefault();
    hypertensionC.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        console.log(values);
      }
    } );
  };


  /** 获取DiabetesA组件的数据 */
  const GetDiabetesA = ( e ) => {
    e.preventDefault();
    diabetesA.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        values.medicationInfo=diabetesA.instances.medicationInfo.state.dataSource;
        console.log(values);
      }
    } );
  };

  /** 获取DiabetesB组件的数据 */
  const GetDiabetesB = ( e ) => {
    e.preventDefault();
    diabetesB.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        console.log(values);
      }
    } );
  };

  /** 获取DiabetesC组件的数据 */
  const GetDiabetesC = ( e ) => {
    e.preventDefault();
    diabetesC.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        console.log(values);
      }
    } );
  };

	return (
		<div>
			<Form className={styles.form} layout="inline" onSubmit={handlerSubmit}>
				<FormItem className={styles.fLeft}>
					{getFieldDecorator( 'status', {
						initialValue: pagination.status,
					} )( <RadioGroup className={styles.tab} onChange={handlerRadioChange}>
						<RadioButton value="1">待处理</RadioButton>
						<RadioButton value="2">已处理</RadioButton>
					</RadioGroup> )}
				</FormItem>
				<FormItem>
					{getFieldDecorator( 'serverPackName', {
						initialValue: pagination.serverPackName,
					} )( <Select style={{ width: 210 }}>
						<Option value="0">所有委托单</Option>
						{/*<Option value="1">家庭医生签约（云医助）</Option>*/}
						<Option value="2">预约代理（云医助）</Option>
						<Option value="3">代理通知（云医助）</Option>
						<Option value="4">跟踪提醒（云健管）</Option>
						<Option value="5">慢病随访（云键管）</Option>
						<Option value="6">慢病健康管理参考方案（云健管）</Option>
					</Select> )}
				</FormItem>
				<FormItem>
					{getFieldDecorator( 'allowDate', {
						initialValue: [
							pagination.dateStart ? moment( pagination.dateStart, 'YYYY-MM-DD' ) : undefined,
							pagination.dateEnd ? moment( pagination.dateEnd, 'YYYY-MM-DD' ) : undefined ],
					} )( <RangePicker showTime format="YYYY-MM-DD"/> )}
				</FormItem>
				<Button size="large" type="primary" htmlType="submit">查询</Button>
			</Form>
			<Table
				className={styles.table}
				bordered
				columns={columns}
				dataSource={dataSource}
				loading={loading}
				rowKey={record => record.orderId}
				pagination={false}
				onRowClick={handlerRowClick}
			/>
			<Pagination
				className="ant-table-pagination"
				total={total}
				current={pagination.page}
				pageSize={pagination.pageSize}
				onChange={handlerPageChange}
			/>

   {/*   <HypertensionA disabled={true}   ref={e => ( hypertensionA = e )} />
      <Button onClick={GetHypertensionA}>点击获取HypertensionA的组件值</Button>

      <HypertensionB disabled={true}   ref={e => ( hypertensionB = e )}/>
      <Button onClick={GetHypertensionB}>点击获取HypertensionB的组件值</Button>

      <HypertensionC disabled={true}   ref={e => ( hypertensionC = e )}/>
      <Button onClick={GetHypertensionC}>点击获取HypertensionC的组件值</Button>

      <DiabetesA disabled={true}   ref={e => (diabetesA = e )} />
      <Button onClick={GetDiabetesA}>点击获取DiabetesA的组件值</Button>

      <DiabetesB disabled={true}   ref={e => ( diabetesB = e )}/>
      <Button onClick={GetDiabetesB}>点击获取DiabetesB的组件值</Button>

      <DiabetesC disabled={true}   ref={e => ( diabetesC = e )}/>
      <Button onClick={GetDiabetesC}>点击获取DiabetesC的组件值</Button>*/}


    </div>
	);
};

const mapStateToProps = ( state ) => {
	return {
		...state,
		loading: state.loading.models.workerModel,
	};
};

export default connect( mapStateToProps )( Form.create()( OrderList ) );

