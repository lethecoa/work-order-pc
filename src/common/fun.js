import moment from 'moment';
import config from './config';

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
  }
}