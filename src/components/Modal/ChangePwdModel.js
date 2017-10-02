import React from 'react';
import {Button, Modal, Form, Input} from 'antd';
import md5 from '../../common/md5.min';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 9}
};

class ChangePwdForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  checkOldPwd = (rule, value, callback) => {
    if (value && md5(value) !== this.props.pwd) {
      callback('原始密码不正确!');
    }
    callback();
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  render() {
    const {visible, onCancel, onSubmit, form, loading} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Modal
        visible={visible}
        title="修改密码"
        maskClosable={false}
        closable={false}
        footer={[
          <Button key="back" size="large" onClick={onCancel}>取消</Button>,
          <Button key="submit" type="primary" size="large" loading={loading} onClick={onSubmit}>提交</Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label="原始密码" hasFeedback>
            {getFieldDecorator('passwordOld', {
              rules: [{
                required: true, message: '请填写原始密码!',
              }, {
                validator: this.checkOldPwd,
              }],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请填写新密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请填写确认密码!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const ChangePwd = Form.create()(ChangePwdForm);

export default class ChangePwdModel extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    const form = this.form;
    form.resetFields();
    this.setState({visible: true});
  };
  handleCancel = () => {
    this.setState({visible: false});
  };
  handleSubmit = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.saveNewPwd(values.password);
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    return (
      <span>
				<a onClick={this.showModal}>修改密码</a>
				<ChangePwd
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
          pwd={this.props.pwd}
          loading={this.props.loading}
        />
			</span>
    );
  }
}
