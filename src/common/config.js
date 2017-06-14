module.exports = {
	api: '/api',
	debug: true,
	PAGE_SIZE: 3,
	name: '客服工单系统',
	storage_prefix: 'wop$',
	local: {
		user: 'user',
		loginInfo: 'loginInfo'
	},
	formItemLayout: {
		labelCol: { span: 4 },
		wrapperCol: { span: 12 }
	},
	userType: {
		doctor: 'doctor', worker: 'worker'
	},
	/**
 	* 根据委托单名称定义表头的显示项
 	*/
	ritField: {
		key: 'key', name: 'name', sex: 'sex', birthday: 'birthday', tel: 'tell', present: 'present',
		disease: 'disease', cardDate: 'cardDate', drugs: 'drugs', notice: 'notice', operation: 'operation',
		booking: 'booking', remark: 'remark'
	}
}