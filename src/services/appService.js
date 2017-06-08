import { api, request } from '../common';

export async function login(params) {
  return request({
    url: api.userLogin,
    method: 'post',
    data: params,
  })
}

export async function init(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}
