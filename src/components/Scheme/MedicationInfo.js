import React from 'react';
import {Form, Table, Input, Icon, Button, Popconfirm} from 'antd';
import styles from './Scheme.less';
import {EditableCell} from '../../components';
class MedicationInfo extends React.Component {

	constructor( props ) {
		super( props );
		this.columns = [
			{
				title: '药品名称',
				dataIndex: 'drugName',
				width: '30%',
				key: 'drugName',
				render: ( text, record, index ) => (
					<EditableCell
						value={text}
						onChange={this.onCellChange( index, 'drugName' )}
					/>
				),
			}, {
				title: '用法(次/每日)',
				dataIndex: 'drugFrequency',
				width: '30%',
				key: 'drugFrequency',
				render: ( text, record, index ) => (
					<EditableCell
						value={text}
						onChange={this.onCellChange( index, 'drugFrequency' )}
					/>
				),
			}, {
				title: '用量（mg/每次）',
				dataIndex: 'dosage',
				width: '30%',
				key: 'dosage',
				render: ( text, record, index ) => (
					<EditableCell
						value={text}
						onChange={this.onCellChange( index, 'dosage' )}
					/>
				)
			},
			{
				title: '操作',
				dataIndex: 'operation',
				width: '10%',
				render: ( text, record, index ) => {
					return (
						this.state.value.length >= 1 ?
							(
								<Popconfirm title="确定删除该药品?" onConfirm={() => this.onDelete( index )}>
									<a href="#">删除</a>
								</Popconfirm>
							) : null
					);
				},
			} ];

		this.state = {
			value: props.value || [],
		};
	}

	onCellChange = ( index, key ) => {
		return ( value ) => {
			const dataSource = [ ...this.state.value ];
			dataSource[ index ][ key ] = value;
			this.setState( { value: dataSource } );
			this.triggerChange( dataSource );
		};
	};

	onDelete = ( index ) => {
		const dataSource = [ ...this.state.value ];
		dataSource.splice( index, 1 );
		this.setState( { value: dataSource } );
		this.triggerChange( dataSource );
	};

	handleAdd = () => {
		const { value } = this.state;
		const newData = {
			key: new Date().getTime(),
			drugName: '',
			drugFrequency: '',
			dosage: '',
		};
		this.setState( {
			value: [ ...value, newData ],
		} );
		this.triggerChange( [ ...value, newData ] );
	};
	triggerChange = ( changedValue ) => {
		const onChange = this.props.onChange;
		if ( onChange ) {
			onChange( changedValue );
		}
	};

	render() {
		const { value } = this.state;
		const columns = this.columns;
		const disable = this.props.disabled;
		return (
			<div>
				<div className={styles.addBtnBox}>
					<Button type="primary" onClick={this.handleAdd} disabled={disable}>添加药品</Button>
				</div>
				<Table bordered dataSource={value} columns={columns} pagination={false}/>
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		if ( 'value' in nextProps && nextProps[ 'value' ] !== undefined ) {
			const value = nextProps.value;
			this.setState( value );
		}
	}
}
export default Form.create()( MedicationInfo );