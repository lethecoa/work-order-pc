module.exports = {
	debug: true,
	ver: '1.03',
	api: '/api',
	/** 下载模版的根路径 */
	tpl: '/tpl/',
	PAGE_SIZE: 3,
	name: '客服工单系统',
	/** 存储在浏览器内的数据 key 的前缀 */
	storage_prefix: 'wop$',
	/** 存储在浏览器内的数据 */
	local: { user: 'user', loginInfo: 'loginInfo' },
	/** 表单布局 */
	formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 12 } },
	/** 用户类型 */
	userType: { doctor: 'doctor', worker: 'worker' },
	/** “居民信息控件”单元格的编辑模式 */
	ritStatus: { general: '显示状态', editing: '编辑中', cancel: '取消编辑' },
	/** 根据委托单名称定义“居民信息控件”表头的显示项  */
	ritField: {
		serviceId: { key: 'serviceId', cn: '服务id', need: true },
		name: { key: 'name', cn: '姓名', need: false },
		sex: { key: 'sex', cn: '性别', need: false },
		birthday: { key: 'birthday', cn: '出生日期', need: false },
		tel: { key: 'tel', cn: '联系电话', need: false },
		disease: { key: 'relatedDiseases', cn: '相关疾病', need: false },
		diseaseCase: { key: 'diseaseSituation', cn: '疾病情况 ', need: false },
		cardDate: { key: 'buildCardDate', cn: '建卡日期 ', need: false },
		drugs: { key: 'drugName', cn: '药品名称 ', need: false },
		present: { key: 'isOnScene', cn: '是否到场', need: true },
		visit: { key: 'isInterview', cn: '是否可访', need: true },
		remark: { key: 'remark', cn: '通知情况', need: true },
		followUp: { key: 'followUp', cn: '随访情况', need: true },
		operation: { key: 'operation', cn: '操作栏', need: false },
		// notice: 'notice', booking: 'booking'
	},
	/** 提交成功提示信息  */
	SUCCESS: '提交成功',
	/** 未上传居民信息样本提示信息  */
	NODATA: '请上传居民信息样本！',
};