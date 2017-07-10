import { Modal, Button } from 'antd';

const ver = [ '1.05', '1.06' ];

const bug = {
  '1.05':
  <div>
    <p># 修复了多行编辑bug，现改进为：点击编辑一行后，隐藏其它行的编辑选项</p>
    <p># 修复了页面切换的时候居民信息表的表头会出现异常的情况，此问题引起了多处bug</p>
  </div>,
  '1.06':
  <div>
    <p># 修复了居民信息表导入问题</p>
  </div>,
};

const mend = {
  '1.05':
  <div>
    <p>$ 增加了通知情况不允许留空的设定</p>
    <p>$ 增加了顶部版本号鼠标悬停显示更新日志的功能</p>
    <p>$ 增加了顶部用户名处鼠标悬停显示用户信息的功能，目前比较简陋</p>
  </div>,
  '1.06':
  <div>$ 修改了系统日志的内在结构，使系统可以保留所有更新日志</div>,
};

const log = ( ver ) => {
  return (
    <div>
      { bug[ ver ] }
      <p>--------------------------------------------------</p>
      { mend[ ver ] }
    </div>
  );
};

const printAll = () => {
  return ver.map(( v ) => {
    return (
      <div>
        <p><b>[{ v }]</b></p>
        { log( v ) }
        <p>&nbsp;</p>
      </div>
    );
  } );
}

const seeMore = () => {
  Modal.info( {
    title: '工单系统的完整更新日志',
    content: printAll(),
    width: 700,
    onOk() { },
  } );
};

module.exports = {
  /**
   * 获取更新日志
   */
  getLog: ( ver ) => {
    return (
      <div>
        { log( ver ) }
        <p>&nbsp;</p>
        <a onClick={ seeMore }>查看完整的更新日志</a>
      </div>
    );
  }
};