import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import { config } from '../../common'
import styles from './Login.less';
import MainLayout from '../../components/layout/MainLayout';

const FormItem = Form.Item;
//const { getFieldDecorator, validateFieldsAndScroll } = Form;

function Login({ dispatch, loginLoading, form: {
    getFieldDecorator,
  validateFieldsAndScroll,
} }) {

  /**
   * 提交登录
   */
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      //dispatch({ type: 'login/login', payload: values })
      console.log('login');
    })
  }
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src="/logo.png" />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="请输入您的用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="请输入登录密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            登录
          </Button>
          <div className={styles.forgetPwd}><a href="#">忘记密码？</a></div>
        </Row>
      </form>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Login));
