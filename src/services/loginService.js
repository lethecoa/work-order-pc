import { request,api } from '../common';

export async function login(data) {
  console.log(data);
  return request({
    url: api.userLogin,
    method: 'post',
    data: JSON.stringify(data)
  })
}