import React from 'react';
import {Modal} from 'antd';
import {HypertensionA, HypertensionB, HypertensionC, DiabetesA, DiabetesB, DiabetesC} from '../../../components';
export default class SchemeModal extends React.Component {
	state = { visible: false };
	title = [ '方案一：协助医生随访高血压患者的体征、生活方式、辅助检查、用药情况 (价格：暂未定价)',
		'方案二：协助医生随访高血压患者的症状 (价格：暂未定价)',
		'方案三：协助医生随访高血压患者的血压数值 (价格：暂未定价)',
		'方案一：协助医生随访糖尿病患者的体征、生活方式、辅助检查、用药情况 (价格：暂未定价)',
		'方案二：协助医生随访糖尿病患者的症状 (价格：暂未定价)',
		'方案三：协助医生随访糖尿病患者的血糖数值 (价格：暂未定价)' ];
	content = [ <HypertensionA disabled={true} scheme={{}}/>,
		<HypertensionB disabled={true} scheme={{}}/>,
		<HypertensionC disabled={true} scheme={{}}/>,
		<DiabetesA disabled={true} scheme={{}}/>,
		<DiabetesB disabled={true} scheme={{}}/>,
		<DiabetesC disabled={true} scheme={{}}/>, ];
	showModal = ( id ) => {
		this.setState( {
			visible: true,
			title: this.title[ id ],
			content: this.content[ id ],
		} );
	};

	handleCancel = () => {
		this.setState( {
			visible: false,
		} );
	};

	render() {
		const { title, visible, content } = this.state;
		return (
			<Modal
				title={title}
				visible={visible}
				onCancel={this.handleCancel}
				footer={null}
				width="90%"
			>
				{content}
			</Modal>
		);
	}
}