import React, { Component, PropTypes } from 'react';
import { Form,  Input, Modal } from 'antd';
import styles from './DoctorAccount.css';

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
    const {doctorName,orgId,orgName,remainingBalance,doctorTel,ifDisable} = record;

    return(
      <div className={styles.inline}>
        <div className={styles.inline}>
          <span onClick={this.showModelHandler}>
          { children }
          </span>
          <Modal
            title="医生账号详细信息"
            visible={this.state.visible}
            onOk={this.hideModelHandler}
            onCancel={this.hideModelHandler}
          >
            <Form horizontal>

              <FormItem {...formItemLayout} label="医生姓名">
                { getFieldDecorator( 'doctorName', {
                  initialValue: doctorName
                } )( <Input style={ { width: 200 } }  disabled={true}/> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="登录账号">
                { getFieldDecorator( 'userName', {
                  initialValue: doctorTel
                } )( <Input style={ { width: 200 } }  disabled={true}/> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="机构名称">
                { getFieldDecorator( 'orgName', {
                  initialValue: orgName
                } )( <Input style={ { width: 200 } }  disabled={true}/> ) }
              </FormItem>

              <FormItem {...formItemLayout} label="账户余额">
                { getFieldDecorator( 'remainingBalance', {
                  initialValue: remainingBalance
                } )( <Input style={ { width: 200 } }  disabled={true}/> ) }
              </FormItem>
              <FormItem {...formItemLayout} label="是否禁用">
                { getFieldDecorator( 'ifDisable', {
                  initialValue: ifDisable === '1' ? '是' : '否'
                } )( <Input style={ { width: 200 } }  disabled={true}/> ) }
              </FormItem>

            </Form>
          </Modal>
        </div>
      </div>
    )

  }
}

export default Form.create()( SecretaryDetail);
