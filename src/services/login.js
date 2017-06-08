import { request,api } from '../common/';

export async function login(data) {
  return request({
    url: api.userLogin,
    method: 'post',
    data,
  })
}