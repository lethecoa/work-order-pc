import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button, Select, Radio, Row, Icon, Form, Input, Checkbox, notification} from 'antd';
import {config, action, model, fun} from '../../common'
import styles from './Login.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

function Login( {
	dispatch, loading, loginModel: { loginInfo }, userType,
	form: { getFieldDecorator, validateFieldsAndScroll }
} ) {

	/**
	 * 提交登录信息
	 */
	const login = () => {
		validateFieldsAndScroll( ( errors, values ) => {
			if ( !errors ) {
				dispatch( { type: fun.fuse( model.login, action.login ), payload: values } );
			}
		} )
	};

	const forgetPwd = () => {
		notification.open( {
			message: '亲，你又忘记密码了？',
			description: '请拨打客服电话：10010，获得该支持！',
		} );
	};

	/**
	 * 切换登录类型
	 * @param e
	 */
	const handleChange = ( e ) => {
		dispatch( { type: fun.fuse( model.app, action.app_saveUserType ), payload: e.target.value } );
	};

	return (
		<div className={styles.body}>
			<div className={styles.form}>
				<div className={styles.logo}>
					<img src="/loginLogo.png"/>
				</div>
				<div className={styles.radioBox}>
					<RadioGroup defaultValue={userType ? userType : config.userType.doctor} onChange={handleChange}>
						<RadioButton value={config.userType.doctor}>医生登录</RadioButton>
						<RadioButton value={config.userType.worker}>客服登录</RadioButton>
						{/*<RadioButton value={config.userType.admin}>系统管理</RadioButton>*/}
					</RadioGroup>
				</div>
				<form>
					{true ? '' :
						<FormItem>
							<RadioGroup defaultValue="a" size="small">
								<RadioButton value="a">使用基卫帐号登录</RadioButton>
								<RadioButton value="b">使用电话号码登录</RadioButton>
							</RadioGroup>
						</FormItem>
					}
					{userType === 'doctor' ?
						<FormItem hasFeedback>
							{getFieldDecorator( 'telMobile', {
								initialValue: loginInfo.telMobile,
								rules: [
									{
										required: true,
										pattern: /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
										message: '您输入的手机号码有误！'
									},
								],
							} )( <Input prefix={<Icon type="user"/>} onPressEnter={login} placeholder="请输入您的手机号"/> )}
						</FormItem>
						:
						<FormItem hasFeedback>
							{getFieldDecorator( 'loginName', {
								initialValue: loginInfo.loginName,
								rules: [
									{
										required: true,
										message: '请输入您的用户名！'
									},
								],
							} )( <Input prefix={<Icon type="user"/>} onPressEnter={login} placeholder="请输入您的用户名"/> )}
						</FormItem>
					}
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
					{true ? '' :
						<FormItem label="请选择所在城市：" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
							<Select showSearch defaultValue="sm" optionFilterProp="children" onChange={handleChange}>
								<Option value="sm">三明</Option>
								<Option value="fz">福州</Option>
								<Option value="qz">泉州</Option>
								<Option value="zz">漳州</Option>
								<Option value="pt">莆田</Option>
								<Option value="np">南平</Option>
								<Option value="xm">厦门</Option>
							</Select>
						</FormItem>
					}
					<FormItem>
						{getFieldDecorator( 'remember', {
							valuePropName: 'checked',
							initialValue: true,
						} )(
							<Checkbox>保存帐号</Checkbox>
						)}
						<a className={styles.forgetPwd} onClick={forgetPwd}>忘记密码？</a>
						<Button type="primary" onClick={login} loading={loading}>登录</Button>
					</FormItem>
				</form>
			</div>
		</div>
	);
}

function mapStateToProps( state ) {
	return {
		...state,
		loading: state.loading.models.loginModel,
		userType: state.appModel.userType,
	};
}

Login.prototype = {
	loginInfo: PropTypes.object
};

export default connect( mapStateToProps )( Form.create()( Login ) );
