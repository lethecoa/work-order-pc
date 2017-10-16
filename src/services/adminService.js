import {request, api} from '../common';

export async function queryAccountInfo(data) {
  return request({
    url:api.queryAccountInfo,
    data
  })
}
export async function queryAccountPersonInfo(data) {
  return request({
    url:api.queryAccountPersonInfo,
    data
  })
}
  export async function querySecretaryInfo(data) {
    return request({
      url:api.querySecretaryInfo,
      data
    })
  }

/**
 * 删除医生个人信息
 * @param data
 * @returns {Promise.<*>}
 */
  export async function  deletAccountInfo(data) {
  return request({
    url:api.deletAccountInfo,
    data
  })
}
//修改医生个人信息
  export async function updateAccountPersonInfo(data) {
  return request({
    url:api.updateAccountPersonInfo,
    data,
    body:JSON.stringify(data),
  })
}

/**
 * 新增医生信息
 * @param data
 * @returns {Promise.<*>}
 */
  export async function createAccountInfo(data) {
    return request({
      url:api.createAccountInfo,
      data,
      body:JSON.stringify(data),
  })
}

  export async function querySysOrgInfo(data) {
    return request({
      url:api.querySysOrgInfo,
      data
  })
}

/**
 * 新增客服信息
 * @param data
 * @returns {Promise.<*>}
 */
  export async function createSecretaryInfo(data) {
  return request({
    url:api.createSecretaryInfo,
    data,
    body:JSON.stringify(data),
  })
}

/**
 * 删除客服个人信息
 * @param data
 * @returns {Promise.<*>}
 */
  export async function deletSecretaryInfo(data) {
  return request({
    url:api.deletSecretaryInfo,
    data
  })
}

/**
 * 修改客服个人信息
 * @param data
 * @returns {Promise.<*>}
 */
export async function updateSecretaryPersonInfo(data) {
  return request({
    url: api.updateSecretaryPersonInfo,
    data
  })
}

