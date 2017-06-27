import config from './config';

module.exports = {
	userLogin: config.api + '/wo/login',
	userLogout: '',
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
};