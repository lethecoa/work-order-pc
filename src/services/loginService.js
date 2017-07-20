import {request, api} from '../common';

export async function login( data ) {
	return request( {
		url: api.userLogin,
		data
	} )
}
export async function secretaryLogin( data ) {
	return request( {
		url: api.secretaryLogin,
		data
	} )
}