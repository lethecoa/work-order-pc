import React from 'react';
import styles from './OrderStep.css';
import {Steps} from 'antd';

const Step = Steps.Step;

function OrderStep( props ) {
	return (
		<div className={styles.normal}>
			<Steps className={styles.step} size="small" current={props.currentStep}>
				<Step title="填写委托单"/>
				<Step title="确认填写信息"/>
				<Step title="支付委托费用"/>
				<Step title="等待客服处理"/>
			</Steps>
		</div>
	);
}

export default OrderStep;
