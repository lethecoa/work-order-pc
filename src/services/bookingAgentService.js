import { request,api } from '../common';

export async function saveSign(data) {
  return request({
    url: api.saveSign,
    data
  })
}