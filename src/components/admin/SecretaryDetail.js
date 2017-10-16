import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, DatePicker, Input, Modal, Radio } from 'antd';
import styles from './SecretaryDetail.css'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


class SecretaryDetail extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      path: props.path,
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.path !== this.state.path ) {
      this.props.form.resetFields();
      this.state.path = nextProps.path;
    }
  }

  showModelHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true,
    });
  };
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { children } = this.props;
    let { record } = this.props;

    if(typeof(record) == "undefined"){
      record= "";
    }
    const {loginName,name,sex,tel,age,orgName} = record;

    return(
      <div className={styles.inline}>
        <div className={styles.inline}>
          <span onClick={this.showModelHandler}>
          { children }
          </span>
          <Modal
            title="客服账号基本信息"
            visible={this.state.visible}
            onOk={this.hideModelHandler}
            onCancel={this.hideModelHandler}
          >
            <Form>

              <FormItem {...formItemLayout} label={"客服登录账号"}>
                { getFieldDecorator('loginName', {initialValue: loginName} )
                ( <Input style={ { width: 200 } } disabled={true}/> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"姓名"}>
                { getFieldDecorator('name', {initialValue: name} )
                ( <Input style={ { width: 200 } } disabled={true}/> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"电话"}>
                { getFieldDecorator('tel', {initialValue: tel} )
                ( <Input style={ { width: 200 } } disabled={true}/> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"性别"}>
                { getFieldDecorator('sex', { initialValue: sex } )
                ( <Input style={ { width: 200 } } disabled={true}/> )}
              </FormItem>
              <FormItem {...formItemLayout} label={"年龄"}>
                { getFieldDecorator('age', {initialValue: age} )
                ( <Input style={ { width: 200 } } disabled={true}/> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"机构名称"}>
                { getFieldDecorator('orgName', {initialValue: orgName} )
                ( <Input style={ { width: 200 } } disabled={true}/> ) }
              </FormItem>

            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Form.create()( SecretaryDetail);
