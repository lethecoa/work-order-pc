import config from './config';

const root = '/';
const confirm = 'confirm';

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
	/**
	 * 签约家庭
	 */
	signFamily: {
		url: 'signFamily', name: 'signFamily', cn: '签约家庭', ritRef: 'dljmqy',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	/**
	 * 预约代理
	 */
	residentSign: {
		url: 'residentSign', name: 'residentSign', cn: '预约居民签约', ritRef: 'yyjmqy',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	residentInspect: {
		url: 'residentInspect', name: 'residentInspect', cn: '预约居民体检', ritRef: 'yyjmtj',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	newborn: {
		url: 'newborn', name: 'newborn', cn: '预约新生儿家庭访视', ritRef: 'yyxsfs',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	postpartum: {
		url: 'postpartum', name: 'postpartum', cn: '预约产后访视', ritRef: 'yychfs',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	/**
	 * 慢性病随访通知
	 */
	chronicDisease: {
		url: 'chronicDisease', name: 'chronicDisease', cn: '慢性病随访通知', ritRef: 'mbsftz',
		ritDoctor: [ config.ritField.name, config.ritField.sex, config.ritField.birthday, config.ritField.tel ]
	},
	newestPolicy: 'newestPolicy',
	newestActivity: 'newestActivity',
	antenatalCare: 'antenatalCare',
	childHealth: 'childHealth',
	medication: root + 'medication',
	curativeEffect: 'curativeEffect',
	hypertension: 'hypertension',
	diabetes: 'diabetes',

	getModuleName: ( modular ) => {
		return modular.cn + '(' + modular.name + ')';
	}
};