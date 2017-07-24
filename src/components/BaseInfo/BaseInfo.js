import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, DatePicker, Input } from 'antd';
import moment from 'moment';
import styles from './BaseInfo.less';
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

class BaseInfo extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			path: props.path,
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.path !== this.state.path ) {
			this.props.form.resetFields();
			this.state.path = nextProps.path;
		}
	}

	disabledDate = ( current ) => {
		// Can not select days before today and today
		return current && current.valueOf() < Date.now();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={ styles.need }>
				<div className={ styles.title }>
					<i className={ styles.icon + ' ' + styles.wof + ' ' + styles[ 'woc-xinxi' ] }/>基本信息</div>
				<div className={ styles.form }>
					<FormItem>
						{ getFieldDecorator( 'doctorId', {
							initialValue: this.props.doctorId
						} )( <Input style={ { width: 200 } } disabled type="hidden" /> ) }
					</FormItem>
					<Row>
						<Col span={ 12 }>
							<FormItem {...formItemLayout} label="委托人姓名">
								{ getFieldDecorator( 'doctorName', {
									initialValue: this.props.doctorName
								} )( <Input style={ { width: 200 } } disabled /> ) }
							</FormItem>
						</Col>
						<Col span={ 12 }>
							<FormItem {...formItemLayout} label="委托人联系方式">
								{ getFieldDecorator( 'doctorTel', {
									initialValue: this.props.doctorTel
								} )( <Input style={ { width: 200 } } disabled /> ) }
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={ 12 }>
							<FormItem {...formItemLayout} label="任务截止时间">
								{ getFieldDecorator( 'taskDeadlineDate', {
									initialValue: this.props.taskDeadlineDate ? moment( this.props.taskDeadlineDate, 'YYYY-MM-DD' ) : undefined,
									rules: [
										{ required: true, message: '请选择截止日期！' },
									],
								} )( <DatePicker
									style={ { width: 200 } }
									disabled={ this.props.disabled }
									disabledDate={ this.disabledDate }
								/> ) }
							</FormItem>
						</Col>
						<Col span={ 12 }>
							<FormItem {...formItemLayout} label="委托人数" style={ { display: this.props.display } }>
								{ getFieldDecorator( 'entrustNumber', {
									initialValue: this.props.entrustNumber
								} )( <Input style={ { width: 200 } } disabled /> ) }
							</FormItem>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default Form.create()( BaseInfo );