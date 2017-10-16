import config from './config';

module.exports = {
  userLogin: config.api + '/wo/login',
  secretaryLogin: config.api + '/callCenter/secretaryLogin',
  adminLogin: config.api + '/background/login',
  changePwd: config.api + '/background/updateUserPassWord',
  getItemInfoById: config.api + '/workorder/getItemInfoById',
  uploadExcel: config.api + '/callCenter/resolveExcel',
  /** 保存预约居民签约 */
  saveSign: config.api + '/workorder/saveSign',
  /** 保存预约居民体检 */
  savePhysicalExam: config.api + '/workorder/savePhysicalExam',
  /** 保存预约新生儿家庭访视 */
  saveNewBorn: config.api + '/workorder/saveNewBorn',
  /** 保存预约产后访视 */
  savePostpartum: config.api + '/workorder/savePostpartum',
  /** 保存慢病随访通知 */
  saveChronic: config.api + '/workorder/saveChronic',
  /** 保存最新政策通知 */
  savePolicy: config.api + '/workorder/savePolicy',
  /** 保存最新活动通知 */
  saveActivity: config.api + '/workorder/saveActivity',
  /** 保存孕产妇产检通知 */
  saveGravida: config.api + '/workorder/saveGravida',
  /** 保存儿童健康随访通知 */
  saveChildren: config.api + '/workorder/saveChildren',
  /** 保存用药提醒 */
  saveDrug: config.api + '/workorder/saveDrug',
  /** 保存用药疗效跟踪 */
  saveDrugeffect: config.api + '/workorder/saveDrugeffect',
  /** 保存高血压随访 */
  saveBlood: config.api + '/workorder/saveBlood',
  /** 保存糖尿病随访 */
  saveSugar: config.api + '/workorder/saveSugar',
  /** 查询委托单列表 */
  getOrders: config.api + '/callCenter/getOrders',
  /** 查询委托单明细 */
  getOrderDetail: config.api + '/callCenter/getOrderDetail',
  /** 保存委托单明细 */
  saveService: config.api + '/callCenter/saveService',
  /** 确认完成所有委托内容 */
  confirmOrder: config.api + '/callCenter/confirmOrder',

  /** 查询医生个人信息*/
  queryAccountPersonInfo: config.api +'/background/queryAccountPersonInfo',
  /** 查询分组下医生信息*/
  queryAccountInfo : config.api+'/background/queryAccountInfo',
  /**查询分组下客服列表信息*/
  querySecretaryInfo : config.api +'/background/querySecretaryInfo',
  /**删除医生信息*/
  deletAccountInfo : config.api+'/background/deletAccountInfo',
  /** 修改医生信息*/
  updateAccountPersonInfo : config.api+'/background/updateAccountPersonInfo',
  /** 新增医生信息*/
  createAccountInfo: config.api+'/background/createAccountInfo',
  /**查询机构*/
  querySysOrgInfo: config.api+'/background/querySysOrgInfo',
  /**新增客服信息*/
  createSecretaryInfo: config.api+'/background/createSecretaryInfo',
  /**删除客服信息*/
  deletSecretaryInfo: config.api+'/background/deletSecretaryInfo',
  /**修改客服信息*/
  updateSecretaryPersonInfo: config.api+'/background/updateSecretaryPersonInfo',
  /**查看客服个人信息*/
  queryScretarytPersonInfo: config.api+'/background/queryScretarytPersonInfo',
};
