import {request, api} from '../common';

export async function savePolicy( data ) {
	return request( {
		url: api.savePolicy,
		data
	} )
}