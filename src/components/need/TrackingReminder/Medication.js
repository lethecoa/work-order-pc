import React from 'react';
import {Form, Input} from 'antd';
import {config} from '../../../common';
import styles from './Medication.less';

function Medication( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;
	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="要求">
					{getFieldDecorator( 'requirements', {
						initialValue: props.requirements
					} )(
						<Input type="textarea" rows={4} placeholder="请在此输入您的要求" disabled={props.disabled}/>
					)}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( Medication );