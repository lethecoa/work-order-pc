import React from 'react';
import {Form, Input} from 'antd';
import {fun} from '../../common';
import Symptom from './Symptom';
import styles from './Scheme.less';

const FormItem = Form.Item;
const symptomOptions = [
	{ label: '无症状', value: 0 },
	{ label: '多尿', value: 1 },
	{ label: '手脚麻木', value: 2 },
	{ label: '多饮', value: 3 },
	{ label: '视力模糊', value: 4 },
	{ label: '下肢浮肿', value: 5},
	{ label: '多食', value: 6 },
	{ label: '感染', value: 7 },
	{ label: '体重明显下降', value:8 },
];

class HypertensionB extends React.Component {
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
				<div className={styles.form}>
					<FormItem label="症状" className={styles.item}>
						{getFieldDecorator( 'symptom', {
							initialValue: scheme.symptom ? fun.strToIntArr( scheme.symptom ) : []
						} )(
							<Symptom options={symptomOptions} disabled={disabled}/>
						)}
					</FormItem>
					<FormItem label="其他症状" className={styles.item}>
						{getFieldDecorator( 'otherSymptom', {
							initialValue: scheme.otherSymptom
						} )(
							<Input type="textarea" size="large" rows={4} disabled={disabled} placeholder="可在此处输入其他症状"/>
						)}
					</FormItem>
				</div>
			</div>
		);
	}
}
export default Form.create()( HypertensionB );

