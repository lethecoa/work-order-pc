import {MutexRadioGroup} from '../base';
export default class Symptom extends MutexRadioGroup {
	constructor( props ) {
		super( props );

		this.state = {
			options: props.options,
			value: props.value || [ 1 ]
		};
	}
}
