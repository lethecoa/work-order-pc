import {request, api} from '../common';

export async function saveSign( data ) {
	return request( {
		url: api.saveSign,
		data
	} )
}
export async function savePhysicalExam( data ) {
	return request( {
		url: api.savePhysicalExam,
		data
	} )
}
export async function saveNewBorn( data ) {
	return request( {
		url: api.saveNewBorn,
		data
	} )
}
export async function savePostpartum( data ) {
	return request( {
		url: api.savePostpartum,
		data
	} )
}