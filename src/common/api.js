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
};