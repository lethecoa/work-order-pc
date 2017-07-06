import React from 'react';
import {DatePicker} from 'antd';

export default  class CustomRangePicker extends React.Component {
	constructor( props ) {
		super( props );

		const value = this.props.value || {};
		this.state = {
			dateEnd: value.dateEnd || '',
			dateStart: value.dateStart || '',
		};
	}

	componentWillReceiveProps( nextProps ) {
		// Should be a controlled component.
		if ( 'value' in nextProps ) {
			const value = nextProps.value;
			this.setState( value );
		}
	}

	handleDateStartChange = ( selectedDate ) => {
		if ( !('value' in this.props) ) {
			this.setState( { dateStart: selectedDate } );
		}
		this.triggerChange( { dateStart: selectedDate } );
	};

	handleDateEndChange = ( selectedDate ) => {
		if ( !('value' in this.props) ) {
			this.setState( { dateEnd: selectedDate } );
		}
		this.triggerChange( { dateEnd: selectedDate } );
	};

	triggerChange = ( changedValue ) => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if ( onChange ) {
			onChange( Object.assign( {}, this.state, changedValue ) );
		}
	};

	disabledStartDate = ( startValue ) => {
		const endValue = this.state.dateEnd;
		if ( !startValue || !endValue ) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	disabledEndDate = ( endValue ) => {
		const startValue = this.state.dateStart;
		if ( !endValue || !startValue ) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	render() {
		return (
			<div>
				<DatePicker
					format="YYYY-MM-DD"
					size="large"
					placeholder="开始日期"
					disabledDate={this.disabledStartDate}
					onChange={this.handleDateStartChange}
				/>
				&nbsp;
				<DatePicker
					format="YYYY-MM-DD"
					size="large"
					placeholder="结束日期"
					disabledDate={this.disabledEndDate}
					onChange={this.handleDateEndChange}
				/>
			</div>
		);
	}
}