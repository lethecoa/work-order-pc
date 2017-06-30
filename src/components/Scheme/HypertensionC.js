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

class HypertensionC extends React.Component {
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
							<FormItem {...formItemLayout} label="舒张压（mmHg）">
								{getFieldDecorator( 'sbp', {
									initialValue: scheme.sbp
								} )(
									<InputNumber min={1} max={300} style={{ width: 200 }} disabled={disabled} placeholder="请输入1-300之间的一个数值"/>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="收缩压（mmHg）">
								{getFieldDecorator( 'dbp', {
									initialValue: scheme.dbp
								} )(
									<InputNumber min={1} max={300} style={{ width: 200 }} disabled={disabled} placeholder="请输入1-300之间的一个数值"/>
								)}
							</FormItem>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default Form.create()( HypertensionC );

