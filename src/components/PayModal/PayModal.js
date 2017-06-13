import React from 'react';
import {Modal, Button, Form, Input} from 'antd';
const FormItem = Form.Item;
import styles from './PayModal.less';

const formItemLayout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 9 }
};

export default class PayModal extends React.Component {
	state = {
		loading: false,
		visible: false,
		expenseAccount: 0,
	};

	showModal = ( expenseAccount ) => {
		this.setState( {
			visible: true,
			expenseAccount: expenseAccount,
		} );
	};

	handleOver = () => {
		this.setState( { loading: false, visible: false } );
	};

	handleOk = () => {
		this.setState( { loading: true } );
		this.props.handleSubmit( this.state.expenseAccount );
	};

	handleCancel = () => {
		this.setState( { loading: false, visible: false } );
	};

	render() {
		const { visible, loading, expenseAccount } = this.state;
		return (
			<div>
				<Modal
					visible={visible}
					title="支付详情"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					maskClosable={false}
					closable={false}
					footer={[
						<Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
						<Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
							确认支付并提交
						</Button>,
					]}
				>
					<FormItem {...formItemLayout} label="账户余额">
						<Input className={styles.right} type="text" value={this.props.remainingBalance + '元'} disabled/>
					</FormItem>
					<FormItem {...formItemLayout} label="本次委托费用">
						<Input className={styles.right} type="text" value={expenseAccount + '元'} disabled/>
					</FormItem>
				</Modal>
			</div>
		);
	}
}