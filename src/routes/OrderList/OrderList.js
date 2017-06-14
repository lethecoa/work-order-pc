import React from 'react';
import {connect} from 'dva';
import {Form, Select} from 'antd';
import styles from './OrderList.less';

const FormItem = Form.Item;
const Option = Select.Option;

const OrderList = () => {
	function handleChange( value ) {
		console.log( `selected ${value}` );
	}

	return (
		<div className={styles.normal}>
			<Form>
				<FormItem>
					<Select defaultValue="0" style={{ width: 210 }} onChange={handleChange}>
						<Option value="0">所有委托单</Option>
						<Option value="1">家庭医生签约（云医助）</Option>
						<Option value="2">预约代理（云医助）</Option>
						<Option value="3">代理通知（云医助）</Option>
						<Option value="4">跟踪提醒（云健管）</Option>
						<Option value="5">慢病随访（云键管）</Option>
						<Option value="6">慢病健康管理参考方案（云健管）</Option>
					</Select>
				</FormItem>
			</Form>
		</div>
	);
};

function mapStateToProps() {
	return {};
}
function mapDispatchToProps() {
	return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( OrderList ) );

