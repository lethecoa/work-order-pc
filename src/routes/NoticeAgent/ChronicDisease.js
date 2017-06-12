import React from 'react';
import { connect } from 'dva';
import styles from './ChronicDisease.less';
import { BaseInfo, OrderStep, ResidentInfoTable, CarryMaterial } from '../../components';
import { fun, modular } from '../../common';
import { Form, Input, DatePicker, Checkbox, Button } from 'antd';

const moduleName = modular.getModuleName( modular.chronicDisease );
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;

function ChronicDisease( { dispatch, loading, user, form,
  form: { getFieldDecorator, validateFieldsAndScroll, setFieldsValue } } ) {
  let residentInfoTable;
  // fun.print( '1212', '', moudleName );
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
  };
  const interviewOptions = [
    { label: '血压', value: 1 },
    { label: '血糖', value: 2 },
    { label: '血脂', value: 3 },
    { label: '糖化血红蛋白', value: 4 }
  ];

  const confirmOrder = () => {
    fun.print( residentInfoTable.getData(), 'residentInfoTable', moduleName );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>慢病随访通知委托表</div>
      <OrderStep />
      <BaseInfo {...user} />
      <div className={styles.need}>
        <div className={styles.title}>需求说明</div>
        <Form className={styles.form}>
          <FormItem label="随访项目" {...formItemLayout} hasFeedback>
            {getFieldDecorator( 'interviewItem', {
              initialValue: [ 1 ],
              rules: [
                {
                  required: true,
                  message: '请至少选择一个随访项目！'
                },
              ],
            } )( <CheckboxGroup options={interviewOptions} /> )}
          </FormItem>
          <FormItem label="社区联系方式" {...formItemLayout} hasFeedback>
            {getFieldDecorator( 'communityContact', {
              rules: [
                {
                  required: true,
                  message: '必须填写社区联系方式！'
                },
              ],
            } )( <Input placeholder="请输入本社区联系方式" /> )}
          </FormItem>
          <CarryMaterial layout={formItemLayout} />
          <FormItem label="随访地点" {...formItemLayout} hasFeedback>
            {getFieldDecorator( 'interviewSite', {
              rules: [
                {
                  required: true,
                  message: '必须填写随访地点！'
                },
              ],
            } )( <Input placeholder="请输入您希望的随访地点" /> )}
          </FormItem>
          <FormItem label="随访时间" {...formItemLayout} hasFeedback
            help="时间需精确到小时（日期选择里可以切换时间显示，默认使用当前的时间）">
            {getFieldDecorator( 'interviewDate', {
              rules: [
                {
                  required: true,
                  type: 'array',
                  message: '请选择一个随访的时间段，精确到小时！'
                },
              ],
            } )( <RangePicker size="small" showTime format="YYYY-MM-DD HH:00" /> )}
          </FormItem>
          <FormItem label="其他要求" {...formItemLayout} hasFeedback>
            {getFieldDecorator( 'otherRequirements', )
              ( <Input type="textarea" autosize={{ minRows: 4, maxRows: 6 }}
                placeholder="请在此输入您的其它要求" /> )}
          </FormItem>
        </Form>
      </div>
      <ResidentInfoTable name={modular.chronicDisease.name} ref={e => ( residentInfoTable = e )} />
      <div className={styles.submit}>
        <Button size="large" type="primary" onClick={confirmOrder}>提交我的委托单信息</Button></div>
    </div>
  );
}

function mapStateToProps( state ) {
  return {
    user: state.appModel.user,
  };
}

export default connect( mapStateToProps )( Form.create()( ChronicDisease ) );
