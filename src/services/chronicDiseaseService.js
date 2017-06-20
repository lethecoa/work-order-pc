import {request, api} from '../common';

export async function saveBlood( data ) {
	return request( {
		url: api.saveBlood,
		data
	} )
}
export async function saveSugar( data ) {
	return request( {
		url: api.saveSugar,
		data
	} )
}