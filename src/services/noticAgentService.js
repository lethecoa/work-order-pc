import {request, api} from '../common';

export async function saveChronic( data ) {
	return request( {
		url: api.saveChronic,
		data
	} )
}

export async function savePolicy( data ) {
	return request( {
		url: api.savePolicy,
		data
	} )
}

export async function saveActivity( data ) {
	return request( {
		url: api.saveActivity,
		data
	} )
}

export async function saveGravida( data ) {
	return request( {
		url: api.saveGravida,
		data
	} )
}

export async function saveChildren( data ) {
	return request( {
		url: api.saveChildren,
		data
	} )
}