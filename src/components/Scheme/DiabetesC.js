import React from 'react';
import {Form, InputNumber, Row, Col} from 'antd';
import styles from './Scheme.less';

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

class DiabetesC extends React.Component {
	state = {
		scheme: {},
	};

	componentWillMount() {
		this.setState( { scheme: this.props.scheme } );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { scheme: nextProps.scheme } );
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const disabled = !this.props.disabled;
		const { scheme } = this.state;
		return (
			<div className={styles.need}>
				<div className={styles.title}>随访项目</div>
				<div className={styles.form}>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="空腹血糖（mmol/L）">
								{getFieldDecorator( 'fbg', {
									initialValue: scheme.fbg
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="餐后血糖（mmol/L））">
								{getFieldDecorator( 'pbg', {
									initialValue: scheme.pbg
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default Form.create()( DiabetesC );

