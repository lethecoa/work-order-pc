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
	userType: {
		doctor: 'doctor', worker: 'worker'
	},
	/** 根据委托单名称定义表头的显示项	*/
	ritField: {
		key: 'key', name: 'name', sex: 'sex', birthday: 'birthday', tel: 'tel', present: 'present',
		disease: 'relatedDiseases', diseaseCase: 'diseaseSituation', cardDate: 'cardDate', drugs: 'drugs',
		notice: 'notice', operation: 'operation', booking: 'booking', remark: 'remark'
	}
}