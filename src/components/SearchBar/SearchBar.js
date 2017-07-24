import React, {Component} from 'react';
import {Form, Select, DatePicker, Button} from 'antd';
import moment from 'moment';
import styles from './SearchBar.less';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			path: props.path,
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( (nextProps.path === 'finish' || nextProps.path === 'unfinished' ) && nextProps.path !== this.state.path ) {
			this.props.form.resetFields();
			this.state.path = nextProps.path;
		}
	}

	handleDateStartChange = ( selectedDate ) => {
		this.setState( { dateStart: selectedDate } );
	};

	handleDateEndChange = ( selectedDate ) => {
		this.setState( { dateEnd: selectedDate } );
	};

	disabledStartDate = ( startValue ) => {
		const endValue = this.state.dateEnd;
		if ( !startValue || !endValue ) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	disabledEndDate = ( endValue ) => {
		const startValue = this.state.dateStart;
		if ( !endValue || !startValue ) {
			return false;
		}
		return endValue.valueOf() < startValue.valueOf();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { handlerSubmit, serverPackName, dateStart, dateEnd } = this.props;
		return (
			<Form className={ styles.form } layout="inline" onSubmit={ handlerSubmit }>
				<FormItem>
					{ getFieldDecorator( 'serverPackName', {
						initialValue: serverPackName,
					} )( <Select style={ { width: 210 } }>
						<Option value="0">所有委托单</Option>
						{/*<Option value="1">家庭医生签约（云医助）</Option>*/ }
						<Option value="2">预约代理（云医助）</Option>
						<Option value="3">代理通知（云医助）</Option>
						<Option value="4">跟踪提醒（云健管）</Option>
						<Option value="5">慢病随访（云键管）</Option>
						<Option value="6">慢病健康管理参考方案（云健管）</Option>
					</Select> ) }
				</FormItem>
				<FormItem>
					{ getFieldDecorator( 'dateStart', {
						initialValue: dateStart ? moment( dateStart, 'YYYY-MM-DD' ) : undefined,
					} )( <DatePicker
						format="YYYY-MM-DD"
						size="large"
						placeholder="开始日期"
						disabledDate={this.disabledStartDate}
						onChange={this.handleDateStartChange}
					/> ) }
				</FormItem>
				<FormItem>
					{ getFieldDecorator( 'dateEnd', {
						initialValue: dateEnd ? moment( dateEnd, 'YYYY-MM-DD' ) : undefined,
					} )( <DatePicker
						format="YYYY-MM-DD"
						size="large"
						placeholder="结束日期"
						disabledDate={this.disabledEndDate}
						onChange={this.handleDateEndChange}
					/> ) }
				</FormItem>
				<Button size="large" type="primary" htmlType="submit">查询</Button>
			</Form>
		);
	}
}
export default Form.create()( SearchBar );