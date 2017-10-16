import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, InputNumber, Input, Modal, Select, Radio } from 'antd';
import styles from './DoctorAccount.css';

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
class DoctorAccountModal extends Component {
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
    const {accountId,groupId,doctorName,orgId,orgName,remainingBalance,password,doctorTel,ifDisable} = record;

    return(
      <div className={styles.inline}>
        <div className={styles.inline}>
          <span onClick={this.showModelHandler}>
          { children }
          </span>
          <Modal
            title="基本信息"
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
          >

            <Form horizontal onSubmit={this.onOk}>
              <FormItem>
                { getFieldDecorator('groupId', {
                  initialValue: groupId
                } )( <Input style={ { width: 200 } } type="hidden"/> ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('accountId', {
                  initialValue: accountId
                } )( <Input style={ { width: 200 } } type="hidden"/> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="医生姓名">
                { getFieldDecorator( 'doctorName', {
                  initialValue: doctorName
                } )( <Input style={ { width: 200 } }  /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="登录账号">
                { getFieldDecorator( 'userName',{
                  initialValue:doctorTel,
                  rules: [
                { required: true, message: '登录账号不能为空!' }],
                } )
                ( <InputNumber style={ { width: 200 } }  /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="机构名称">
                { getFieldDecorator( 'orgName', {
                  initialValue: orgName
                } )
                (<Select style={{ width: 200 }} >
                  {orgList ? orgList.map( ( item, index ) => {
                    return (<Select.Option value={item.orgName}>{item.orgName}</Select.Option>)
                  } ) : ''}
                </Select>)}
              </FormItem>

              <FormItem {...formItemLayout} label="账户余额">
                { getFieldDecorator( 'remainingBalance', {
                  initialValue: remainingBalance
                } )( <InputNumber style={ { width: 200 } } /> ) }
              </FormItem>

              <FormItem {...formItemLayout} label={"是否禁用"}>
                { getFieldDecorator( 'ifDisable', {
                  initialValue: ifDisable === '1' ? '1' :'0'
                } )
                  (<RadioGroup>
                    <Radio value={'0'} >否</Radio>
                    <Radio value={'1'} >是</Radio>
                  </RadioGroup>) }
              </FormItem>

            </Form>
          </Modal>
        </div>
      </div>
    )

  }
}

export default Form.create()( DoctorAccountModal );
