import React from 'react';
import {Form, Table, Input, Popconfirm, Button} from 'antd';
import styles from './Scheme.less';
class EditableCell extends React.Component {
	state = {
		value: this.props.value,
		editable: this.props.editable || false,
	};

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.editable !== this.state.editable ) {
			this.setState( { editable: nextProps.editable } );
			if ( nextProps.editable ) {
				this.cacheValue = this.state.value;
			}
		}
		if ( nextProps.status && nextProps.status !== this.props.status ) {
			if ( nextProps.status === 'save' ) {
				this.props.onChange( this.state.value );
			} else if ( nextProps.status === 'cancel' ) {
				this.setState( { value: this.cacheValue } );
				this.props.onChange( this.cacheValue );
			}
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return nextProps.editable !== this.state.editable ||
			nextState.value !== this.state.value;
	}

	handleChange( e ) {
		const value = e.target.value;
		this.setState( { value } );
	}

	render() {
		const { value, editable } = this.state;
		return (
			<div>
				{
					editable ?
						<div>
							<Input
								value={value}
								onChange={e => this.handleChange( e )}
							/>
						</div>
						:
						<div>
							{value.toString() || ' '}
						</div>
				}
			</div>
		);
	}
}

class MedicationInfo extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			value: props.value || [],
			data: [],
		};
	}

	componentWillMount() {
		const data = this.state.value.map( ( item ) => {
			const obj = {};
			Object.keys( item ).forEach( ( key ) => {
				obj[ key ] = key === 'key' ? item[ key ] : { editable: false, value: item[ key ] };
			} );
			return obj;
		} );

		this.setState( { data } );
		this.columns = [ {
			title: '药品名称',
			dataIndex: 'drugName',
			width: '30%',
			render: ( text, record, index ) => this.renderColumns( this.state.data, index, 'drugName', text ),
		}, {
			title: '用法(次/每日)',
			dataIndex: 'drugFrequency',
			width: '30%',
			render: ( text, record, index ) => this.renderColumns( this.state.data, index, 'drugFrequency', text ),
		}, {
			title: '用量（mg/每次）',
			dataIndex: 'dosage',
			width: '30%',
			render: ( text, record, index ) => this.renderColumns( this.state.data, index, 'dosage', text ),
		}, {
			title: '操作',
			dataIndex: 'operation',
			render: ( text, record, index ) => {
				const { editable } = this.state.data[ index ].drugName;
				return (
					<div className={styles.editableRowOperations}>
						{
							editable ?
								<span>
                  <a onClick={() => this.editDone( index, 'save' )}>保存</a>

                  <Popconfirm title="确定取消?" onConfirm={() => this.editDone( index, 'cancel' )}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
								:
								<span>
                  <a onClick={() => this.edit( index )}>编辑</a>
                </span>
						}
						<Popconfirm title="确定删除?" onConfirm={() => this.onDelete( index )}>
							<a href="#">删除</a>
						</Popconfirm>
					</div>
				);
			},
		} ];
	}

	renderColumns( data, index, key, text ) {
		const { editable, status } = data[ index ][ key ];
		if ( typeof editable === 'undefined' ) {
			return text;
		}
		return (<EditableCell
			editable={editable}
			value={text}
			onChange={value => this.handleChange( key, index, value )}
			status={status}
		/>);
	}

	handleChange( key, index, newValue ) {
		const { data, value } = this.state;
		data[ index ][ key ].value = newValue;
		value[ index ][ key ] = newValue;
		this.setState( { data, value } );
		this.triggerChange( value );
	}

	edit( index ) {
		const { data } = this.state;
		Object.keys( data[ index ] ).forEach( ( item ) => {
			if ( data[ index ][ item ] && typeof data[ index ][ item ].editable !== 'undefined' ) {
				data[ index ][ item ].editable = true;
			}
		} );
		this.setState( { data } );
	}

	editDone( index, type ) {
		const { data } = this.state;
		Object.keys( data[ index ] ).forEach( ( item ) => {
			if ( data[ index ][ item ] && typeof data[ index ][ item ].editable !== 'undefined' ) {
				data[ index ][ item ].editable = false;
				data[ index ][ item ].status = type;
			}
		} );
		this.setState( { data }, () => {
			Object.keys( data[ index ] ).forEach( ( item ) => {
				if ( data[ index ][ item ] && typeof data[ index ][ item ].editable !== 'undefined' ) {
					delete data[ index ][ item ].status;
				}
			} );
		} );
	}

	onDelete = ( index ) => {
		const data = [ ...this.state.data ];
		const value = [ ...this.state.value ];
		data.splice( index, 1 );
		value.splice( index, 1 );
		this.setState( { data, value } );
		this.triggerChange( value );
	};

	handleAdd = () => {
		const { data, value } = this.state;
		const newData = {
			key: new Date().getTime(),
			drugName: { editable: false, value: '' },
			drugFrequency: { editable: false, value: '' },
			dosage: { editable: false, value: '' },
		};
		const newValue = {
			key: new Date().getTime(),
			drugName: '',
			drugFrequency: '',
			dosage: '',
		};
		this.setState( {
			data: [ ...data, newData ],
			value: [ ...value, newValue ],
		} );
		//this.triggerChange([ ...value, newValue ]);
	};

	triggerChange = ( changedValue ) => {
		const onChange = this.props.onChange;
		if ( onChange ) {
			onChange( changedValue );
		}
	};

	render() {
		const { value } = this.state;
		const disable = this.props.disabled;
		const columns = this.columns;
		return (
			<div>
				<div className={styles.addBtnBox}>
					<Button type="primary" onClick={this.handleAdd} disabled={disable}>添加药品</Button>
				</div>
				<Table bordered dataSource={value} columns={columns} pagination={false}/>
			</div>
		)
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.value !== this.state.value ) {
			if ( 'value' in nextProps && nextProps[ 'value' ] !== undefined ) {
				const value = nextProps.value;
				const data = value.map( ( item ) => {
					const obj = {};
					Object.keys( item ).forEach( ( key ) => {
						obj[ key ] = key === 'key' ? item[ key ] : { editable: false, value: item[ key ] };
					} );
					return obj;
				} );
				this.setState( { value, data } );
			}
		}
	}
}
export default Form.create()( MedicationInfo );