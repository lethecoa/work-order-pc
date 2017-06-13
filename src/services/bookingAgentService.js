import { request,api } from '../common';

export async function saveSign(data) {
  return request({
    url: api.saveSign,
    data
  })
}
export async function savePhysicalExam(data) {
	return request({
		url: api.savePhysicalExam,
		data
	})
}