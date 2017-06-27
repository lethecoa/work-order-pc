import {request, api} from '../common';

export async function getOrders( data ) {
	return request( {
		url: api.getOrders,
		data
	} )
}

export async function getOrderDetail( data ) {
	return request( {
		url: api.getOrderDetail,
		data
	} )
}

export async function saveService( data ) {
	return request( {
		url: api.saveService,
		data
	} )
}

export async function confirmOrder( data ) {
	return request( {
		url: api.confirmOrder,
		data
	} )
}