import {request, api} from '../common';

export async function getOrders( data ) {
	console.log('====fech====')
	console.log(data);
	return request( {
		url: api.getOrders,
		data
	} )
}