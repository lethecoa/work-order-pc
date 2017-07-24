import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Form, Select, DatePicker, Button, Table, Pagination, Radio} from 'antd';
import {SearchBar} from '../../components'
// import moment from 'moment';
import {action, model, fun, modular} from '../../common';
import styles from './OrderList.less';

// const FormItem = Form.Item;
// const Option = Select.Option;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;

let searchBar;
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
	loading,
	workerModel,
	dispatch,
	path
} ) => {
	/*fun.printLoader( 'orderList' );*/
	// const { resetFields, validateFieldsAndScroll, getFieldDecorator } = form;
	const { pagination, list: dataSource, total } = workerModel;
	/** 查询 */
	const search = ( values ) => {
		if ( values.dateStart ) {
			values.dateStart = values.dateStart.format( 'YYYY-MM-DD' );
		}
		if ( values.dateEnd ) {
			values.dateEnd = values.dateEnd.format( 'YYYY-MM-DD' );
		}
		dispatch( { type: fun.fuse( model.worker, action.worker_getOrders ), payload: values } );
	};
	/** 列表行点击 */
	const handlerRowClick = ( record, index ) => {
		const state = pagination.status === '1' ? 'unfinished/' : 'finish/';
		dispatch( {
			type: fun.fuse( model.worker, action.worker_getOrderDetail ),
			payload: { order: record, url: modular.worker + state + record.itemId }
		} );
	};
	/** 点击查询按钮 */
	const handlerSubmit = ( e ) => {
		e.preventDefault();
		searchBar.validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				search( values );
			}
		} );
	};
	// /** 切换已处理、未处理 */
	// const handlerRadioChange = ( e ) => {
	// 	resetFields();
	// 	dispatch( { type: fun.fuse( model.worker, action.worker_getOrders ), payload: { status: e.target.value } } );
	// };
	/** 翻页 */
	const handlerPageChange = ( page ) => {
		searchBar.validateFieldsAndScroll( ( err, values ) => {
			if ( !err ) {
				values.page = page;
				search( values );
			}
		} );
	};
	/**表格分页器*/
	const tablePagination = {
		total: total,
		current: pagination.page,
		pageSize: pagination.pageSize,
		onChange: handlerPageChange,
		showQuickJumper: true,
		showTotal: total => `共 ${total} 条`,
	};
	return (
		<div>
			<SearchBar ref={ e => ( searchBar = e )} path={path} {...pagination} handlerSubmit={handlerSubmit}/>
			<Table
				className={ styles.table }
				bordered
				columns={ columns }
				dataSource={ dataSource }
				loading={ loading }
				rowKey={ record => record.orderId }
				pagination={ tablePagination }
				onRowClick={ handlerRowClick }
			/>
		</div>
	);
};

const mapStateToProps = ( state ) => {
	return {
		...state,
		loading: state.loading.models.workerModel,
		path: state.appModel.path,
	};
};

export default connect( mapStateToProps )( OrderList );