import {api, request} from '../common';

export async function getItemInfoById(data) {
  return request({
    url: api.getItemInfoById,
    data
  })
}

export async function changePwd(data) {
  return request({
    url: api.changePwd,
    data
  })
}
