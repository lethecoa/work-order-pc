const root = '/';
const confirm = 'confirm';

module.exports = {
  /**
   * 首页
   */
  index: { url: root, name: 'IndexPage', cn: '首页' },
  login: root + 'login',
	/**
   * 签约家庭
	 */
	signFamily: { url: 'signFamily', name: 'SignFamily', cn: '签约家庭' },
	/**
   * 预约代理
	 */
	residentSign: 'residentSign',
  residentInspect: 'residentInspect',
  newborn: 'newborn',
  postpartum: 'postpartum',
  /**
   * 慢性病随访通知
   */
  chronicDisease: { url: 'chronicDisease', name: 'ChronicDisease', cn: '慢性病随访通知' },
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