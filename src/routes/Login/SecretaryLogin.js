import React from 'react';
import {connect} from 'dva';
import {Button, Select, Radio, Row, Icon, Form, Input, Checkbox, notification} from 'antd';
import {action, model, fun} from '../../common'
import styles from './Login.less';

const FormItem = Form.Item;

function Login( {
	dispatch, loading, form: { getFieldDecorator, validateFieldsAndScroll }
} ) {

	/**
	 * 提交登录信息
	 */
	const login = () => {
		validateFieldsAndScroll( ( errors, values ) => {
			if ( !errors ) {
				dispatch( { type: fun.fuse( model.login, action.secretaryLogin ), payload: values } );
			}
		} )
	};
	return (
		<div className={styles.body}>
			<div className={styles.form}>
				<div className={styles.logo}>
					<img src="/secretaryLoginLogo.png"/>
				</div>
				<form>
					<FormItem hasFeedback>
						{getFieldDecorator( 'loginName', {
							rules: [
								{
									required: true,
									message: '请输入您的用户名！'
								},
							],
						} )( <Input prefix={<Icon type="user"/>} onPressEnter={login} placeholder="请输入您的用户名"/> )}
					</FormItem>
					<FormItem hasFeedback>
						{getFieldDecorator( 'password', {
							rules: [
								{
									required: true,
									message: '请填写您的密码！'
								},
							],
						} )( <Input prefix={<Icon type="lock"/>} type="password" onPressEnter={login} placeholder="请输入登录密码"/> )}
					</FormItem>
					<Button type="primary" onClick={login} loading={loading}>登录</Button>
				</form>
			</div>
		</div>
	);
}

function mapStateToProps( state ) {
	return {
		loading: state.loading.models.loginModel,
	};
}

export default connect( mapStateToProps )( Form.create()( Login ) );
