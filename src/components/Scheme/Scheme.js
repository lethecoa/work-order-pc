import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import HypertensionA from './HypertensionA';
import HypertensionB from './HypertensionB';
import HypertensionC from './HypertensionC';
import DiabetesA from './DiabetesA';
import DiabetesB from './DiabetesB';
import DiabetesC from './DiabetesC';
import styles from './Scheme.less';

export default class Scheme extends Component {
	state = {
		visible: false,
		content: '',
		disabled1: true,
		disabled2: true,
		disabled3: true,
		scheme: {},
		inst: {},
	};

	componentWillMount() {
		this.setState( { scheme: this.props.scheme } );
		const interviewScheme = this.props.interviewScheme;
		if ( interviewScheme === '1' ) {
			this.setState( { disabled1: false } );
		} else if ( interviewScheme === '2' ) {
			this.setState( { disabled2: false } );
		} else if ( interviewScheme === '3' ) {
			this.setState( { disabled3: false } );
		}
	}

	showModal = ( e ) => {
		const id = e.currentTarget.id;
		const { name, disabled } = this.props;
		let content = '';
		let title = '';
		if ( name === 'hypertension' && id === '1' ) {
			title = '方案一：协助医生随访高血压患者的体征、生活方式、辅助检查、用药情况';
			content = <HypertensionA ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		} else if ( name === 'hypertension' && id === '2' ) {
			title = '方案二：协助医生随访高血压患者的症状';
			content = <HypertensionB ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		} else if ( name === 'hypertension' && id === '3' ) {
			title = '方案三：协助医生随访高血压患者的血压数值';
			content = <HypertensionC ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		} else if ( name === 'diabetes' && id === '1' ) {
			title = '方案一：协助医生随访糖尿病患者的体征、生活方式、辅助检查、用药情况';
			content = <DiabetesA ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		} else if ( name === 'diabetes' && id === '2' ) {
			title = '方案二：协助医生随访糖尿病患者的症状';
			content = <DiabetesB ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		} else if ( name === 'diabetes' && id === '3' ) {
			title = '方案三：协助医生随访糖尿病患者的血糖数值';
			content = <DiabetesC ref={e => ( this.state.inst = e )} disabled={disabled} scheme={this.state.scheme}/>;
		}

		this.setState( {
			visible: true,
			content,
			title,
		} );
	};

	getData = () => {
		return { scheme: this.state.scheme };
	};

	handleOk = () => {
		this.state.inst.validateFields( ( err, values ) => {
			if ( values.symptom ) {
				values.symptom = values.symptom.join( ',' );
			}

			this.setState( { scheme: values } );
		} );
		this.setState( { visible: false } );
	};

	handleCancel = () => {
		this.state.inst.resetFields();
		this.setState( { visible: false } );
	};

	render() {
		const { title, visible, content, disabled1, disabled2, disabled3 } = this.state;
		return (
			<div>
				<Modal
					width={'90%'}
					visible={visible}
					title={title}
					onCancel={this.handleCancel}
					footer={[
						<Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
						<Button key="submit" type="primary" size="large" onClick={this.handleOk}>确定</Button>,
					]}
				>
					{content}
				</Modal>
				<div className={styles.btn}>
					<a id='1' onClick={this.showModal} disabled={disabled1}>方案一</a>
					<a id='2' onClick={this.showModal} disabled={disabled2}>方案二</a>
					<a id='3' onClick={this.showModal} disabled={disabled3}>方案三</a>
				</div>
			</div>
		);
	}
}