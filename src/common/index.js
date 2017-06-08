import config from './config';
import request from './request';
import api from './api';
import storeage from './storeage';

const parseUrl = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

module.exports = {
  config,
  request,
  api,
  storeage,
  parseUrl,
}