import config from './config';
import action from './action';
import model from './model';

const {
  rownum, name, sex, birthday, tel, cardDate, disease, drugs, present, diseaseCase,
  remark, operation, visit, followUp
} = config.ritField;
const root = '/';
const worker = root + config.userType.worker + '/';
const doctor = root + config.userType.doctor + '/';
const admin = root + config.userType.admin + '/';
/**
 * url：路由对应的访问路径
 * nane：模块英文名称
 * cn：模块中文名称
 * ritRef：居民信息表对应的服务端名称
 * ritDoctor：居民信息表里医生显示的字段配置
 */
module.exports = {
  /**
   * 首页
   */
  index: {url: root, name: 'IndexPage', cn: '首页'},
  login: root + 'login',
  secretaryLogin: root + 'secretaryLogin',
  worker: root + config.userType.worker + '/',
  admin: root + config.userType.admin,
  /**
   * 签约家庭
   */
  signFamily: {
    url: 'signFamily', name: 'signFamily', cn: '签约家庭', ritRef: 'yyjmqy',
    model: model.bookingAgent, action: action.BA_saveSign, monitor: 1,
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, present.key, operation.key]
  },
  /**
   * 预约代理
   */
  residentSign: {
    url: doctor + 'bookingAgent/residentSign', name: 'residentSign', cn: '预约居民家庭医生签约', ritRef: 'yyjmqy',
    model: model.bookingAgent, action: action.BA_saveSign, monitor: 1,
    tpl: config.tpl + 'residentSign.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, remark.key, operation.key],
  },
  yyjmqy: {
    url: worker + 'yyjmqy', name: 'residentSign', monitor: 1, cn: '预约居民家庭医生签约',
  },
  residentInspect: {
    url: doctor + 'bookingAgent/residentInspect', name: 'residentInspect', cn: '预约居民体检', ritRef: 'yyjmtj',
    model: model.bookingAgent, action: action.BA_savePhysicalExam, monitor: 1,
    tpl: config.tpl + 'residentInspect.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, remark.key, operation.key],
  },
  yyjmtj: {
    url: worker + 'yyjmtj', name: 'residentInspect', monitor: 1, cn: '预约居民体检',
  },
  newborn: {
    url: doctor + 'bookingAgent/newborn', name: 'newborn', cn: '预约新生儿家庭访视', ritRef: 'yyxsfs',
    model: model.bookingAgent, action: action.BA_saveNewBorn, monitor: 2,
    tpl: config.tpl + 'newborn.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, visit.key, remark.key, operation.key],
  },
  yyxsfs: {
    url: worker + 'yyxsfs', name: 'newborn', monitor: 2, cn: '预约新生儿家庭访视',
  },
  postpartum: {
    url: doctor + 'bookingAgent/postpartum', name: 'postpartum', cn: '预约产后访视', ritRef: 'yychfs',
    model: model.bookingAgent, action: action.BA_savePostpartum, monitor: 2,
    tpl: config.tpl + 'postpartum.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, visit.key, remark.key, operation.key],
  },
  yychfs: {
    url: worker + 'yychfs', name: 'postpartum', monitor: 2, cn: '预约产后访视',
  },
  /**
   * 通知代理
   */
  chronicDisease: {
    url: doctor + 'chronicDisease/chronicDisease', name: 'chronicDisease', cn: '慢性病随访通知', ritRef: 'mbsftz',
    tpl: config.tpl + 'chronicDisease.xls',
    model: model.noticeAgent, action: action.NA_saveChronic, monitor: 1,
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key, disease.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, disease.key, remark.key, operation.key]
  },
  mbsftz: {
    url: worker + 'mbsftz', name: 'chronicDisease', monitor: 1, cn: '慢性病随访通知',
  },
  newestPolicy: {
    url: doctor + 'chronicDisease/newestPolicy', name: 'newestPolicy', cn: '最新政策通知', ritRef: 'zxzctz',
    model: model.noticeAgent, action: action.NA_savePolicy, monitor: 1,
    tpl: config.tpl + 'newestPolicy.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, remark.key, operation.key]
  },
  zxzctz: {
    url: worker + 'zxzctz', name: 'newestPolicy', monitor: 1, cn: '最新政策通知',
  },
  newestActivity: {
    url: doctor + 'chronicDisease/newestActivity', name: 'newestActivity', cn: '最新活动通知', ritRef: 'zxhdtz',
    model: model.noticeAgent, action: action.NA_saveActivity, monitor: 2,
    tpl: config.tpl + 'newestActivity.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key]
  },
  zxhdtz: {
    url: worker + 'zxhdtz', name: 'newestActivity', monitor: 2, cn: '最新活动通知',
  },
  antenatalCare: {
    url: doctor + 'chronicDisease/antenatalCare', name: 'antenatalCare', cn: '孕产妇产检通知', ritRef: 'yfcjtz',
    model: model.noticeAgent, action: action.NA_saveGravida, monitor: 2,
    tpl: config.tpl + 'antenatalCare.xls',
    ritDoctor: [rownum.key, name.key, birthday.key, tel.key, cardDate.key],
    ritWorker: [rownum.key, name.key, birthday.key, tel.key, cardDate.key, present.key, remark.key, operation.key]
  },
  yfcjtz: {
    url: worker + 'yfcjtz', name: 'antenatalCare', monitor: 2, cn: '孕产妇产检通知',
  },
  childHealth: {
    url: doctor + 'chronicDisease/childHealth', name: 'childHealth', cn: '儿童健康随访通知', ritRef: 'etsftz',
    model: model.noticeAgent, action: action.NA_saveChildren, monitor: 2,
    tpl: config.tpl + 'childHealth.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key]
  },
  etsftz: {
    url: worker + 'etsftz', name: 'childHealth', monitor: 2, cn: '儿童健康随访通知',
  },
  /**
   * 跟踪提醒
   */
  medication: {
    url: doctor + 'trackingReminder/medication', name: 'medication', cn: '用药提醒', ritRef: 'yytx00',
    model: model.trackingReminder, action: action.TR_saveDrug, monitor: 1,
    tpl: config.tpl + 'medication.xls',
    ritDoctor: [rownum.key, name.key, tel.key, diseaseCase.key, drugs.key],
    ritWorker: [rownum.key, name.key, tel.key, diseaseCase.key, drugs.key, remark.key, operation.key]
  },
  yytx00: {
    url: worker + 'yytx00', name: 'medication', monitor: 1, cn: '用药提醒',
  },
  curativeEffect: {
    url: doctor + 'trackingReminder/curativeEffect', name: 'curativeEffect', cn: '用药疗效跟踪', ritRef: 'yylxgz',
    model: model.trackingReminder, action: action.TR_saveDrugeffect, monitor: 1,
    tpl: config.tpl + 'curativeEffect.xls',
    ritDoctor: [rownum.key, name.key, tel.key, diseaseCase.key, drugs.key],
    ritWorker: [rownum.key, name.key, tel.key, diseaseCase.key, drugs.key, remark.key, operation.key]
  },
  yylxgz: {
    url: worker + 'yylxgz', name: 'curativeEffect', monitor: 1, cn: '用药疗效跟踪',
  },
  /**
   * 慢病随访
   */
  hypertension: {
    url: doctor + 'chronicDisease/hypertension', name: 'hypertension', cn: '高血压随访', ritRef: 'gxysf0',
    model: model.chronicDisease, action: action.CD_saveBlood, monitor: 1,
    tpl: config.tpl + 'hypertension.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, followUp.key, remark.key, operation.key]
  },
  gxysf0: {
    url: worker + 'gxysf0', name: 'hypertension', monitor: 1, cn: '高血压随访',
  },
  diabetes: {
    url: doctor + 'chronicDisease/diabetes', name: 'diabetes', cn: '糖尿病随访', ritRef: 'tnbsf0',
    model: model.chronicDisease, action: action.CD_saveSugar, monitor: 1,
    tpl: config.tpl + 'diabetes.xls',
    ritDoctor: [rownum.key, name.key, sex.key, birthday.key, tel.key],
    ritWorker: [rownum.key, name.key, sex.key, birthday.key, tel.key, followUp.key, remark.key, operation.key]
  },
  tnbsf0: {
    url: worker + 'tnbsf0', name: 'diabetes', monitor: 1, cn: '糖尿病随访',
  },
  /**
   * 订单列表
   */
  finishList: {url: doctor + 'orderList?status=2', cn: '已完成订单'},
  unfinishList: {url: doctor + 'orderList?status=1', cn: '待处理订单'},
  /**
   * 订单列表页
   */
  finish: {url: worker + 'orderList/finish', name: 'finish', cn: '已处理'},
  unfinished: {url: worker + 'orderList/unfinished', name: 'unfinished', cn: '待处理'},
  /**
   * 系统管理
   */
  doctorAccount: {url: admin + 'account/doctor', name: 'doctorAccount', cn: '医生账号管理'},
  workerAccount: {url: admin + 'account/worker', name: 'workerAccount', cn: '客服账号管理'},
  getModuleName: (modular) => {
    return modular.cn + '(' + modular.name + ')';
  }
};
