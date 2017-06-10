import config from './config';

module.exports = {
  /**
   * 包装系统的console，指定force=true可以强制在非Debug模式下打印信息
   * 
   * @param {any} obj 要打印的数据
   * @param {string} [mark='未定义标签'] 提示标签
   * @param {boolean} [force=false] 强制输出此信息
   */
  print: ( obj, mark = '未定义标签', moudle = 'none', force = false ) => {
    if ( config.debug || force ) {
      console.log( moudle + ' >>> ' + mark + ': ', obj );
    }
  },
  /**
   * 将model和action组合成路径形式
   * 
   * @param {any} model 
   * @param {any} action 
   * @returns model/action
   */
  fuse: ( model, action ) => {
    return model + '/' + action;
  }
}