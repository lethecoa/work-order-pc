import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, DatePicker, Input, Modal, Radio, Select, InputNumber } from 'antd';
import styles from './SecretaryInfo.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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


let orgList;
class SecretaryInfo extends Component {
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
    orgList = nextProps.orgList;
  }

  showModelHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true,
    });
    this.props.orglist();
  };
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { children } = this.props;
    let { record } = this.props;

    if(typeof(record) == "undefined"){
      record= "";
    }
    const {groupId,secretaryId,loginName,name,sex,tel,age,orgName,roleId} = record;

    return(
      <div className={styles.inline}>
        <div className={styles.inline}>
          <span  onClick={this.showModelHandler}>
          { children }
          </span>
          <Modal
            title="客服基本信息"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
          >
            <Form horizontal onSubmit={this.onOk}>
              <FormItem {...formItemLayout}>
                { getFieldDecorator('groupId', {initialValue: groupId} )
                ( <Input style={ { width: 100 } } type='hidden' /> ) }
              </FormItem>
              <FormItem {...formItemLayout}>
                { getFieldDecorator('secretaryId', {initialValue: secretaryId} )
                ( <Input style={ { width: 100 } } type='hidden' /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="登录账号">
                { getFieldDecorator( 'userName' ,{initialValue:loginName,
                  rules: [
                    { required: true, message: '登录账号不能为空!' }],
                })
                ( <Input style={ { width: 200 } }  /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label={"姓名"}>
                { getFieldDecorator('name', {initialValue: name} )
                ( <Input style={ { width: 200 } } /> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"电话"}>
                { getFieldDecorator('tel', {initialValue: tel} )
                ( <InputNumber style={ { width: 200 } } /> ) }
              </FormItem>
              <FormItem {...formItemLayout} label={"性别"}>
                {getFieldDecorator('sex', { initialValue: sex==='0' ? '0' : '1'} )
                (<RadioGroup>
                  <Radio value={"0"} >男</Radio>
                  <Radio value={"1"} >女</Radio>
                </RadioGroup>) }
              </FormItem>
              <FormItem {...formItemLayout} label={"年龄"}>
                { getFieldDecorator('age', {initialValue: age} )
                ( <InputNumber style={ { width: 200 } } /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="机构名称">
                { getFieldDecorator( 'orgName',
                  {initialValue: orgName}
                  )
                (<Select style={{ width: 200 }} >
                  {orgList ? orgList.map( ( item, index ) => {
                    return (<Select.Option value={item.orgName} key={index}>{item.orgName}</Select.Option>)
                  } ) : ''}
                </Select>)}
              </FormItem>

            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Form.create()( SecretaryInfo );
