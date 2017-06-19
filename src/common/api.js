import config from './config';

module.exports = {
	userLogin: config.api + '/wo/login',
	userLogout: '',
	getItemInfoById: config.api + '/workorder/getItemInfoById',
	saveSign: config.api + '/workorder/saveSign',
	uploadExcel: config.api + '/callCenter/resolveExcel',
	savePhysicalExam: config.api + '/workorder/savePhysicalExam',
	saveNewBorn: config.api + '/workorder/saveNewBorn',
	savePostpartum: config.api + '/workorder/savePostpartum',
	savePolicy: config.api + '/workorder/savePolicy',
	/** 保存最新活动通知委托单 */
	saveActivity: config.api + '/workorder/saveActivity',
	getOrders: config.api + '/callCenter/getOrders',
	/** 查询委托单明细 */
	getOrderDetail: config.api + '/callCenter/getOrderDetail',
};