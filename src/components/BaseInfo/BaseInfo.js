import React from 'react';
import {Row, Col, Form, DatePicker, Input} from 'antd';
import styles from './BaseInfo.less';

function UserInfo(props) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;
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
	return (
		<div className={styles.need}>
			<div className={styles.title}>基本信息</div>
			<Form  className={styles.form}>
				<Row>
					<Col span={12}>
						<FormItem
							{...formItemLayout}
							label="委托人姓名"
						>
							<Input style={{ width: 200 }} value={props.doctorName} disabled/>
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem
							{...formItemLayout}
							label="委托人联系方式"
						>
							<Input style={{ width: 200 }} value={props.doctorTel} disabled/>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem
							{...formItemLayout}
							label="任务截止时间"
						>
							{getFieldDecorator( 'taskDeadlineDate', {
								rules: [
									{ required: true, message: '请选择截止日期！', type: 'object' },
								],
							} )(
								<DatePicker style={{ width: 200 }}/>
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem
							{...formItemLayout}
							label="委托人数"
						>
							<Input style={{ width: 200 }} value={20} disabled/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</div>
	);
}

export default Form.create()(UserInfo);;