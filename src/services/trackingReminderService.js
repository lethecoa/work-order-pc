import {request, api} from '../common';

export async function saveDrug( data ) {
	return request( {
		url: api.saveDrug,
		data
	} )
}

export async function saveDrugeffect( data ) {
	return request( {
		url: api.saveDrugeffect,
		data
	} )
}