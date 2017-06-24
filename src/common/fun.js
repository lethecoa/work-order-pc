import moment from 'moment';
import config from './config';
import { notification, Modal } from 'antd';
module.exports = {
	/**
	 * 包装系统的console，指定force=true可以强制在非Debug模式下打印信息
	 *
	 * @param {any} obj 要打印的数据
	 * @param {string} [mark='未定义标签'] 提示标签
	 * @param {string} [moudle='none'] 模块名称
	 * @param {boolean} [force=false] 强制输出此信息
	 */
	print: ( obj, mark = '未定义标签', moudle = 'none', force = false ) => {
		if ( config.debug || force ) {
			console.log( moudle + ' >>> ' + mark + ': ', obj );
		}
	},
	/**
	 * 打印模块的加载时间
	 *
	 * @param {string} moudle 模块名称
	 */
	printLoader: ( moudle ) => {
		if ( config.debug ) {
			console.log( '============== 加载（' + moment().format( 'MM-DD HH:mm:ss' ) + '）：' + moudle + ' ==============' );
		}
	},
	/**
	 * 将model和action组合成路径形式：model/action
	 *
	 * @param {string} model
	 * @param {string} action
	 * @returns
	 */
	fuse: ( model, action ) => {
		return model + '/' + action;
	},
	/**
	 * 将时间毫秒值转为字符串形式
	 * @param nS
	 * @returns {string}
	 */
	getLocalTime: ( nS ) => {
		return new Date( parseInt( nS ) ).toLocaleString().replace( /:\d{1,2}$/, ' ' );
	},
	/**
	 * 字符串数组转整形数组
	 * @param dataStr
	 * @returns {Array}
	 */
	strToIntArr: ( dataStr ) => {
		let dataStrArr = dataStr.split( "," );//分割成字符串数组
		let dataIntArr = [];//保存转换后的整型字符串
		return dataStrArr.map( function ( data ) {
			return +data;
		} );
	},
	/**
	 * 判断是否为空对象
	 * @param obj
	 * @returns {boolean}
	 */
	isEmptyObject: ( obj ) => {
		for ( let key in obj ) {
			return false
		}
		return true
	},
	/** 显示提交结果 */
	showResult: ( data, msg, funName ) => {
		if ( data.success ) {
			showNotification( msg ? msg : config.SUCCESS );
		} else {
			showError( data.message );
			console.error( 'request >>> ' + funName + ': ', data.message );
		}
	},
	showNotification: ( msg, description = '' ) => {
		notification.open( {
			message: msg,
			description: description,
		} );
	},
	/** 错误信息打印 */
	showError: ( title, msg = '' ) => {
		Modal.error( {
			title: title,
			content: msg
		} );
	}
};