import React from 'react';
import {Form, InputNumber, Row, Col, Radio} from 'antd';
import MedicationInfo from './MedicationInfo';
import styles from './Scheme.less';

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
class HypertensionA extends React.Component {
	state = {
		scheme: {},
	};

	componentWillMount() {
		this.setState( { scheme: this.props.scheme } );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { scheme: nextProps.scheme } );
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const disabled = this.props.disabled;
		const { scheme } = this.state;
		return (
			<div className={styles.need}>
				<div className={styles.title}>随访项目</div>
				<div className={styles.box}>
					<div className={styles.item}>1.体征</div>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="舒张压（mmHg）">
								{getFieldDecorator( 'sbp', {
									initialValue: scheme.sbp
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled} min={1} max={300} placeholder="请输入1-300之间的一个数值"/>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="收缩压（mmHg）">
								{getFieldDecorator( 'dbp', {
									initialValue: scheme.dbp
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled} min={1} max={300} placeholder="请输入1-300之间的一个数值"/>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="体重（Kg）">
								{getFieldDecorator( 'weight', {
									initialValue: scheme.weight
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
					</Row>
				</div>
				<div className={styles.box}>
					<div className={styles.item}>2.生活方式</div>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="日吸烟量（支）">
								{getFieldDecorator( 'smokingPerDay', {
									initialValue: scheme.smokingPerDay
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="日饮酒量（两）">
								{getFieldDecorator( 'drinkingPerDay', {
									initialValue: scheme.drinkingPerDay
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="运动频次（次/周）">
								{getFieldDecorator( 'exerciseFrequency', {
									initialValue: scheme.exerciseFrequency
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="运动时长（分钟/次）">
								{getFieldDecorator( 'exerciseDuration', {
									initialValue: scheme.exerciseDuration
								} )(
									<InputNumber style={{ width: 200 }} disabled={disabled}/>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="摄盐情况（咸淡）">
								{getFieldDecorator( 'saltUptake', {
									initialValue: scheme.saltUptake ? parseInt( scheme.saltUptake ) : undefined
								} )(
									<RadioGroup style={{ width: 200 }} disabled={disabled}>
										<Radio value={1}>轻</Radio>
										<Radio value={2}>中</Radio>
										<Radio value={3}>重</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
						</Col>
					</Row>
				</div>
				<div className={styles.box}>
					<div className={styles.item}>3.辅助检查</div>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="药物依从性">
								{getFieldDecorator( 'drugCompliance', {
									initialValue: scheme.drugCompliance ? parseInt( scheme.drugCompliance ) : undefined
								} )(
									<RadioGroup style={{ width: 200 }} disabled={disabled}>
										<Radio value={1}>规律</Radio>
										<Radio value={2}>间断</Radio>
										<Radio value={3}>不服药</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="药物不良反应">
								{getFieldDecorator( 'adr', {
									initialValue: scheme.adr ? parseInt( scheme.adr ) : undefined
								} )(
									<RadioGroup style={{ width: 200 }} disabled={disabled}>
										<Radio value={1}>无</Radio>
										<Radio value={2}>有</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<FormItem {...formItemLayout} label="低血糖反应">
								{getFieldDecorator( 'hypoglycemia', {
									initialValue: scheme.hypoglycemia ? parseInt( scheme.hypoglycemia ) : undefined
								} )(
									<RadioGroup style={{ width: 200 }} disabled={disabled}>
										<Radio value={1}>无</Radio>
										<Radio value={2}>偶尔</Radio>
										<Radio value={3}>频繁</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem {...formItemLayout} label="此次随访情况">
								{getFieldDecorator( 'followUpType', {
									initialValue: scheme.followUpType ? parseInt( scheme.followUpType ) : undefined
								} )(
									<RadioGroup style={{ width: 400 }} disabled={disabled}>
										<Radio value={1}>控制良好</Radio>
										<Radio value={2}>控制一般</Radio>
										<Radio value={3}>控制差</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
					</Row>
				</div>
				<div className={styles.item}>4.用药情况</div>
				<div className={styles.tableBox}>
					<FormItem>
						{getFieldDecorator( 'drugList', {
							initialValue: scheme.drugList
						} )(
							<MedicationInfo disabled={disabled}/>
						)}
					</FormItem>
				</div>
			</div>
		);
	}
}
export default Form.create()( HypertensionA );

