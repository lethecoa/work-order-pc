import config from './config';
import action from './action';
import model from './model';

const root = '/';
const {
	name, sex, birthday, tel, cardDate, disease, drugs, present, diseaseCase,
	remark, operation, visit, followUp
} = config.ritField;
const worker = '/worker';

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
	index: { url: root, name: 'IndexPage', cn: '首页' },
	login: root + 'login',
	worker: root + 'worker',
	/**
	 * 签约家庭
	 */
	signFamily: {
		url: 'signFamily', name: 'signFamily', cn: '签约家庭', ritRef: 'yyjmqy',
		model: model.bookingAgent, action: action.BA_saveSign, monitor: 1,
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, operation.key ]
	},
	/**
	 * 预约代理
	 */
	residentSign: {
		url: 'residentSign', name: 'residentSign', cn: '预约居民签约', ritRef: 'yyjmqy',
		model: model.bookingAgent, action: action.BA_saveSign, monitor: 1,
		tpl: config.tpl + 'residentSign.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, remark.key, operation.key ],
	},
	workeryyjmqy: {
		url: worker + 'yyjmqy', name: 'residentSign', monitor: 1, cn: '预约居民签约',
	},
	residentInspect: {
		url: 'residentInspect', name: 'residentInspect', cn: '预约居民体检', ritRef: 'yyjmtj',
		model: model.bookingAgent, action: action.BA_savePhysicalExam, monitor: 1,
		tpl: config.tpl + 'residentInspect.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, remark.key, operation.key ],
	},
	workeryyjmtj: {
		url: worker + 'yyjmtj', name: 'residentInspect', monitor: 1, cn: '预约居民体检',
	},
	newborn: {
		url: 'newborn', name: 'newborn', cn: '预约新生儿家庭访视', ritRef: 'yyxsfs',
		model: model.bookingAgent, action: action.BA_saveNewBorn, monitor: 2,
		tpl: config.tpl + 'newborn.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, visit.key, remark.key, operation.key ],
	},
	workeryyxsfs: {
		url: worker + 'yyxsfs', name: 'newborn', monitor: 2, cn: '预约新生儿家庭访视',
	},
	postpartum: {
		url: 'postpartum', name: 'postpartum', cn: '预约产后访视', ritRef: 'yychfs',
		model: model.bookingAgent, action: action.BA_savePostpartum, monitor: 2,
		tpl: config.tpl + 'postpartum.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, visit.key, remark.key, operation.key ],
	},
	workeryychfs: {
		url: worker + 'yychfs', name: 'postpartum', monitor: 2, cn: '预约产后访视',
	},
	/**
	 * 慢性病随访通知
	 */
	chronicDisease: {
		url: 'chronicDisease', name: 'chronicDisease', cn: '慢性病随访通知', ritRef: 'mbsftz',
		tpl: config.tpl + 'chronicDisease.xls',
		model: model.noticeAgent, action: action.NA_saveChronic, monitor: 1,
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key, disease.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, disease.key, remark.key, operation.key ]
	},
	workermbsftz: {
		url: worker + 'mbsftz', name: 'chronicDisease', monitor: 1, cn: '慢性病随访通知',
	},
	newestPolicy: {
		url: 'newestPolicy', name: 'newestPolicy', cn: '最新政策通知', ritRef: 'zxzctz',
		model: model.noticeAgent, action: action.NA_savePolicy, monitor: 2,
		tpl: config.tpl + 'newestPolicy.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key ]
	},
	workerzxzctz: {
		url: worker + 'zxzctz', name: 'newestPolicy', monitor: 2, cn: '最新政策通知',
	},
	newestActivity: {
		url: 'newestActivity', name: 'newestActivity', cn: '最新活动通知', ritRef: 'zxhdtz',
		model: model.noticeAgent, action: action.NA_saveActivity, monitor: 2,
		tpl: config.tpl + 'newestActivity.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key ]
	},
	workerzxhdtz: {
		url: worker + 'zxhdtz', name: 'newestActivity', monitor: 2, cn: '最新活动通知',
	},
	antenatalCare: {
		url: 'antenatalCare', name: 'antenatalCare', cn: '孕产妇产检通知', ritRef: 'yfcjtz',
		model: model.noticeAgent, action: action.NA_saveGravida, monitor: 2,
		tpl: config.tpl + 'antenatalCare.xls',
		ritDoctor: [ name.key, birthday.key, tel.key, cardDate.key ],
		ritWorker: [ name.key, birthday.key, tel.key, cardDate.key, present.key, remark.key, operation.key ]
	},
	workeryfcjtz: {
		url: worker + 'yfcjtz', name: 'antenatalCare', monitor: 2, cn: '孕产妇产检通知',
	},
	childHealth: {
		url: 'childHealth', name: 'childHealth', cn: '儿童健康随访通知', ritRef: 'etsftz',
		model: model.noticeAgent, action: action.NA_saveChildren, monitor: 2,
		tpl: config.tpl + 'childHealth.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key ]
	},
	workeretsftz: {
		url: worker + 'etsftz', name: 'childHealth', monitor: 2, cn: '儿童健康随访通知',
	},
	medication: {
		url: 'medication', name: 'medication', cn: '用药提醒', ritRef: 'yytx00',
		model: model.trackingReminder, action: action.TR_saveDrug, monitor: 1,
		tpl: config.tpl + 'medication.xls',
		ritDoctor: [ name.key, tel.key, diseaseCase.key, drugs.key ],
		ritWorker: [ name.key, tel.key, diseaseCase.key, drugs.key, remark.key, operation.key ]
	},
	workeryytx00: {
		url: worker + 'yytx00', name: 'medication', monitor: 1, cn: '用药提醒',
	},
	curativeEffect: {
		url: 'curativeEffect', name: 'curativeEffect', cn: '用药疗效跟踪', ritRef: 'yylxgz',
		model: model.trackingReminder, action: action.TR_saveDrugeffect, monitor: 1,
		tpl: config.tpl + 'curativeEffect.xls',
		ritDoctor: [ name.key, tel.key, diseaseCase.key, drugs.key ],
		ritWorker: [ name.key, tel.key, diseaseCase.key, drugs.key, remark.key, operation.key ]
	},
	workeryylxgz: {
		url: worker + 'yylxgz', name: 'curativeEffect', monitor: 1, cn: '用药疗效跟踪',
	},
	hypertension: {
		url: 'hypertension', name: 'hypertension', cn: '高血压随访', ritRef: 'gxysf0',
		model: model.chronicDisease, action: action.CD_saveBlood, monitor: 1,
		tpl: config.tpl + 'hypertension.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, remark.key, operation.key ]
	},
	workergxysf0: {
		url: worker + 'gxysf0', name: 'hypertension', monitor: 1, cn: '高血压随访',
	},
	diabetes: {
		url: 'diabetes', name: 'diabetes', cn: '糖尿病随访', ritRef: 'tnbsf0',
		model: model.chronicDisease, action: action.CD_saveSugar, monitor: 1,
		tpl: config.tpl + 'diabetes.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, remark.key, operation.key ]
	},
	workertnbsf0: {
		url: worker + 'tnbsf0', name: 'diabetes', monitor: 1, cn: '糖尿病随访',
	},
	/**
	 * 订单列表页
	 */
	orderList: { url: 'orderList', name: 'orderList', cn: '小秘书工单' },
	getModuleName: ( modular ) => {
		return modular.cn + '(' + modular.name + ')';
	}
};