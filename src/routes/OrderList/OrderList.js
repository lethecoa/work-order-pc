import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Form, Select, DatePicker, Button, Table, Pagination, Radio} from 'antd';
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
	handlerRowClick,
	search,
	onRadioChange,
} ) => {

	const { resetFields, validateFieldsAndScroll, getFieldDecorator } = form;
	const { pageSize, list: dataSource, page, total } = workerModel;

	const handlerSubmit = ( e ) => {
		e.preventDefault();
		validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				search( values );
			}
		} );
	};
	const handlerRadioChange = ( e ) => {
		resetFields();
		onRadioChange( e.target.value );
	};
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
						initialValue: '1',
					} )( <RadioGroup className={styles.tab} onChange={handlerRadioChange}>
						<RadioButton value="1">待处理</RadioButton>
						<RadioButton value="2">已处理</RadioButton>
					</RadioGroup> )}
				</FormItem>
				<FormItem>
					{getFieldDecorator( 'serverPackName', {
						initialValue: '0',
					} )( <Select style={{ width: 210 }}>
						<Option value="0">所有委托单</Option>
						<Option value="1">家庭医生签约（云医助）</Option>
						<Option value="2">预约代理（云医助）</Option>
						<Option value="3">代理通知（云医助）</Option>
						<Option value="4">跟踪提醒（云健管）</Option>
						<Option value="5">慢病随访（云键管）</Option>
						<Option value="6">慢病健康管理参考方案（云健管）</Option>
					</Select> )}
				</FormItem>
				<FormItem>
					{getFieldDecorator( 'allowDate', {} )( <RangePicker showTime format="YYYY-MM-DD"/> )}
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
				current={page}
				pageSize={pageSize}
				onChange={handlerPageChange}
			/>

		</div>
	);
};

const mapStateToProps = ( state ) => {
	fun.print( state, 'state', moduleName );
	return {
		...state,
		loading: state.loading.models.workerModel,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		search: ( values ) => {
			if ( values.allowDate ) {
				values.dateStart = values.allowDate[ 0 ].format( 'YYYY-MM-DD' );
				values.dateEnd = values.allowDate[ 1 ].format( 'YYYY-MM-DD' );
			}
			delete(values[ "allowDate" ]);
			dispatch( { type: fun.fuse( model.worker, action.OL_getOrders ), payload: values } );
		},
		handlerRowClick: ( record, index ) => {
			console.log( record )
		},
		onRadioChange: ( value ) => {
			dispatch( { type: fun.fuse( model.worker, action.OL_getOrders ), payload: { status: value } } );
		}
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( OrderList ) );

