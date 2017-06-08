import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Select, Radio, Row, Icon, Form, Input, Checkbox } from 'antd';
import { config } from '../../common'
import styles from './Login.less';
import MainLayout from '../../components/layout/MainLayout';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

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

  /**
   * 切换城市选择
   * 
   * @param {any} value 
   */
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src="/loginLogo.png" />
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
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input prefix={<Icon type="user" />} onPressEnter={handleOk} placeholder="请输入您的手机号" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input prefix={<Icon type="lock" />} type="password" onPressEnter={handleOk} placeholder="请输入登录密码" />)}
          </FormItem>
          <FormItem label="请选择所在城市：" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
            {/*请选择所在城市：*/}
            <Select
              showSearch
              defaultValue="sm"
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Option value="sm">三明</Option>
              <Option value="fz">福州</Option>
              <Option value="qz">泉州</Option>
              <Option value="zz">漳州</Option>
              <Option value="pt">莆田</Option>
              <Option value="np">南平</Option>
              <Option value="xm">厦门</Option>
            </Select>
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>保存帐号</Checkbox>
              )}
            <a className={styles.forgetPwd} href="">忘记密码？</a>
            <Button type="primary" htmlType="submit">登录</Button>
          </FormItem>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Login));
