import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import styles from './Login.less';
import MainLayout from '../../components/layout/MainLayout';

function Login() {
  return (
    <MainLayout>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
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
            })(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
              Sign in
          </Button>
            <p>
              <span>Username：guest</span>
              <span>Password：guest</span>
            </p>
          </Row>
        </form>
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
