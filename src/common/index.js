import config from './config';
import request from './request';
import api from './api';
import urlMap from './urlMap';
import model from './model';
import action from './action';
import storeage from './storeage';

/**
 * 包装系统的console
 * 
 * @param {any} obj 
 * @param {string} [mark='未定义标签'] 
 * @param {boolean} [force=false] 强制输出此信息
 */
const print = (obj, mark = '未定义标签', force = false) => {
  if (config.debug || force) {
    console.log('>>> ' + mark + ': ', obj);
  }
}

module.exports = {
  config,
  request,
  api,
  urlMap,
  model,
  action,
  storeage,
  // 以下是函数注册
  print,
}