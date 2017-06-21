import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Form, Select, DatePicker, Button, Table, Pagination, Radio} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../common';
import styles from './OrderList.less';

const moduleName = modular.getModuleName( modular.orderList );
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
	console.log( '===orderList===' );
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

	return (
		<div>
			<Form className={styles.form} layout="inline" onSubmit={handlerSubmit}>
				<FormItem>
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

