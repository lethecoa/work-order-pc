import config from './config';
import action from './action';
import model from './model';

const root = '/';
const {
	name, sex, birthday, tel, cardDate, disease, drugs, present,
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
		url: 'signFamily', name: 'signFamily', cn: '签约家庭', ritRef: 'dljmqy',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, operation.key ]
	},
	/**
	 * 预约代理
	 */
	residentSign: {
		url: 'residentSign', name: 'residentSign', cn: '预约居民签约', ritRef: 'yyjmqy',
		model: model.bookingAgent, action: action.BA_saveSign,
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, remark.key, operation.key ],
	},
	workeryyjmqy: {
		url: worker + 'yyjmqy', name: 'residentSign',
	},
	residentInspect: {
		url: 'residentInspect', name: 'residentInspect', cn: '预约居民体检', ritRef: 'yyjmtj',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
	},
	newborn: {
		url: 'newborn', name: 'newborn', cn: '预约新生儿家庭访视', ritRef: 'yyxsfs',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
	},
	postpartum: {
		url: 'postpartum', name: 'postpartum', cn: '预约产后访视', ritRef: 'yychfs',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
	},
	/**
	 * 慢性病随访通知
	 */
	chronicDisease: {
		url: 'chronicDisease', name: 'chronicDisease', cn: '慢性病随访通知', ritRef: 'mbsftz',
		tpl: config.tpl + 'chronicDisease.xls',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, followUp.key, remark.key, operation.key ]
	},
	newestPolicy: {
		url: 'newestPolicy', name: 'newestPolicy', cn: '最新政策通知', ritRef: 'zxzctz',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key ]
	},
	newestActivity: {
		url: 'newestActivity', name: 'newestActivity', cn: '最新活动通知', ritRef: 'zxhdtz',
		model: model.noticeAgent, action: action.NA_saveActivity,
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
		ritWorker: [ name.key, sex.key, birthday.key, tel.key, present.key, remark.key, operation.key ]
	},
	workerzxhdtz: {
		url: worker + 'zxhdtz', name: 'newestActivity',
	},
	antenatalCare: {
		url: 'antenatalCare', name: 'antenatalCare', cn: '孕产妇产检通知', ritRef: 'yfcjtz',
		ritDoctor: [ name, birthday, tel, cardDate ]
	},
	childHealth: {
		url: 'childHealth', name: 'childHealth', cn: '儿童健康随访通知', ritRef: 'etsftz',
		ritDoctor: [ name.key, sex.key, birthday.key, tel.key ],
	},
	medication: root + 'medication',
	curativeEffect: 'curativeEffect',
	hypertension: 'hypertension',
	diabetes: 'diabetes',
	/**
	 * 订单列表页
	 */
	orderList: { url: 'orderList', name: 'orderList', cn: '小秘书工单' },
	getModuleName: ( modular ) => {
		return modular.cn + '(' + modular.name + ')';
	}
};