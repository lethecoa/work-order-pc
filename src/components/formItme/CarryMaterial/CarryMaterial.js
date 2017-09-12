import React from 'react';
import {fun} from '../../../common';
import {MutexRadioGroup} from '../../base';
import styles from './CarryMaterial.less';

const moduleName = '所需携带材料控件(CarryMaterial)';
const materialOptions = [
	{ label: '身份证', value: 1 },
	{ label: '社保卡', value: 2 },
	{ label: '户口本', value: 3 },
	{ label: '不携带任何材料', value: 0 },
];

export default class CarryMaterial extends MutexRadioGroup {
	constructor( props ) {
		super( props );

		this.state = {
			options: materialOptions,
			value: props.value || [ 1 ]
		};
	}
}