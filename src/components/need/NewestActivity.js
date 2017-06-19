import React from 'react';
import {Row, Col, Form, DatePicker, Input, Radio} from 'antd';
import moment from 'moment';
import {action, model, fun, config, modular} from '../../common';
import styles from './NewestActivity.less';

const RadioGroup = Radio.Group;

function NewestActivity( props ) {
	const FormItem = Form.Item;
	const { getFieldDecorator } = props.form;

	return (
		<div className={styles.need}>
			<div className={styles.title}>需求说明</div>
			<div className={styles.form}>
				<FormItem {...config.formItemLayout} label="是否确认居民可到场情况">
					{getFieldDecorator( 'isOnSceneSituation', {
						initialValue: props.isOnSceneSituation ? parseInt( props.isOnSceneSituation ) : 0
					} )(
						<RadioGroup disabled={props.disabled}>
							<Radio value={1}>是</Radio>
							<Radio value={0}>否</Radio>
						</RadioGroup>
					)}
				</FormItem>
			</div>
		</div>
	);
}

export default Form.create()( NewestActivity );