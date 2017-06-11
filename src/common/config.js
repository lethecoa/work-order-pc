module.exports = {
  debug: true,
  PAGE_SIZE: 3,
  name: '客服工单系统',
  storage_prefix: 'wop$',
  local: {
    user: 'user',
    loginInfo: 'loginInfo'
  },
	materialOptions : [
		{ label: '身份证', value: 1 },
		{ label: '社保卡', value: 2 },
		{ label: '不携带任何材料', value: 0 },
	],
	formItemLayout : {
		labelCol: { span: 4 },
		wrapperCol: { span: 12 }
	}
}