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

// 测试数据
const data = [
  {
    "birthday": "1986-09-03",
    "rownum": "1",
    "orderId": "18f8a3ca-550e-44fa-ac2b-be3615061a5b",
    "sex": "男",
    "name": "王五",
    "tel": "13512542197",
    "serviceId": "3a09559c-81bc-4c98-be85-319b8a8ab40a",
    "status": "1",
    "createDate": "1497284235000"
  },
  {
    "birthday": "2000-10-10",
    "rownum": "2",
    "orderId": "18f8a3ca-550e-44fa-ac2b-be3615061a5b",
    "sex": "男",
    "name": "张三",
    "tel": "1886448555",
    "serviceId": "54b2dfa2-3d5d-4a54-9cbb-464550f8b0d0",
    "status": "1",
    "createDate": "1497284235000"
  },
  {
    "birthday": "1998-05-16",
    "rownum": "3",
    "orderId": "18f8a3ca-550e-44fa-ac2b-be3615061a5b",
    "sex": "女",
    "name": "李四",
    "tel": "13951775012",
    "serviceId": "7a2115a2-f63d-4100-8ac0-4baf9c1491f8",
    "status": "1",
    "createDate": "1497284235000"
  }
];

function ChronicDisease( { dispatch, loading, user, form,
  form: { getFieldDecorator, validateFieldsAndScroll, setFieldsValue } } ) {
  let residentInfoTable;
  let disabled = false;

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

  /** 提交委托单 */
  const confirmOrder = ( e ) => {
    e.preventDefault();
    validateFieldsAndScroll(( err, values ) => {
      fun.print( values, 'residentInfoTable', moduleName );
    } );
  }
  /** 保存单条数据 */
  const saveRow = ( row ) => {
    console.log( '================= save: ', row );
  }
  /** 提交单条数据 */
  const submitRow = ( row ) => {
    console.log( '================= submit: ', row );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>慢病随访通知委托表</div>
      <OrderStep />
      <BaseInfo {...user} />
      <div className={styles.need}>
        <div className={styles.title}>需求说明</div>
        <Form className={styles.form}>
          <FormItem label="随访项目" {...formItemLayout}>
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
          <FormItem label="社区联系方式" {...formItemLayout}>
            {getFieldDecorator( 'communityContact', {
              initialValue: '1',
              rules: [
                {
                  required: true,
                  message: '必须填写社区联系方式！'
                },
              ],
            } )( <Input placeholder="请输入本社区联系方式" /> )}
          </FormItem>
          <FormItem label="所需携带材料" {...formItemLayout}>
            {getFieldDecorator( 'carryMaterial', {
              rules: [
                {
                  required: true,
                  message: '请至少选择其中一项！'
                },
              ],
            } )( <CarryMaterial /> )}
          </FormItem>
          <FormItem label="随访地点" {...formItemLayout}>
            {getFieldDecorator( 'interviewSite', {
              initialValue: '1',
              rules: [
                {
                  required: true,
                  message: '必须填写随访地点！'
                },
              ],
            } )( <Input placeholder="请输入您希望的随访地点" /> )}
          </FormItem>
          <FormItem label="随访时间" {...formItemLayout}
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
          <FormItem label="其他要求" {...formItemLayout}>
            {getFieldDecorator( 'otherRequirements', )
              ( <Input type="textarea" autosize={{ minRows: 4, maxRows: 6 }}
                placeholder="请在此输入您的其它要求" /> )}
          </FormItem>
        </Form>
      </div>
      <ResidentInfoTable name={modular.chronicDisease.name} userType="worker" monitor={2}
        data={data} onSave={e => saveRow( e )} onSubmit={e => submitRow( e )}
        disabled={disabled} ref={e => ( residentInfoTable = e )} />
      <div className={styles.submit}>
        <Button size="large" type="primary" onClick={confirmOrder}>提交我的委托单信息</Button></div>
    </div>
  );
}

function mapStateToProps( state ) {
  return {
    ...state,
    user: state.appModel.user,
    loading: state.loading.models.appModel,
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onSubmit: ( values ) => {
      fun.print( values, 'onSubmit', moduleName );
      // dispatch( { type: fun.fuse( model.bookingAgent, action.BA_onSubmit ), payload: values } );
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Form.create()( ChronicDisease ) );
