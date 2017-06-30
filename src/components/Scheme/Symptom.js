import React from 'react';
import {Checkbox, Form} from 'antd';
const CheckboxGroup = Checkbox.Group;

class Symptom extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			value: props.value || [],
		};
	}

	selectOne = ( list ) => {
		let valueList;
		if ( list[ list.length - 1 ] === 0 ) {
			valueList = [ 0 ];
		} else {
			valueList = list.filter( ( item ) => { return item !== 0; } );
		}
		this.setState( { value: valueList } );
		this.triggerChange( valueList );
	};

	triggerChange = ( changedValue ) => {
		const onChange = this.props.onChange;
		if ( onChange ) {
			onChange( changedValue );
		}
	};

	render() {
		return (
			<CheckboxGroup options={this.props.options} onChange={this.selectOne} value={this.state.value} disabled={this.props.disabled}/>
		)
	}

	componentWillReceiveProps( nextProps ) {
		if ( 'value' in nextProps && nextProps[ 'value' ] !== undefined ) {
			const value = nextProps.value;
			this.setState( value );
		}
	}
}

export default Form.create()( Symptom );
