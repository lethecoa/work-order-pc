import {api, request} from '../common';

export async function getItemInfoById( data ) {
	return request( {
		url: api.getItemInfoById,
		data
	} )
}