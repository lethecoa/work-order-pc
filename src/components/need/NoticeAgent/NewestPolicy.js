import React from 'react';
import {Form, Input} from 'antd';
import {config} from '../../../common';
import styles from './NewestPolicy.less';

function NewestPolicy( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="政策内容">
					{getFieldDecorator( 'policyContent', {
						initialValue: props.policyContent,
						rules: [
							{
								required: true,
								message: '请输入政策内容！'
							},
						]
					} )(
						<Input type="textarea" rows={8} placeholder="请输入政策内容：如政策下发时间、下发内容、需要居民配合的事项等" disabled={props.disabled}/>
					)}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( NewestPolicy );