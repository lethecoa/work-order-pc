import React from 'react';
import { Table, Pagination, Popconfirm } from 'antd';
import immutable from 'immutable';
import { config, fun, modular } from '../../common';
import { EditableInputCell, EditableRadioCell, EditableSelectCell, FollowUpCell } from '../formItme';
import styles from './InfoTable.less';

const { is, Map } = immutable;
const moduleName = '信息表控件(infoTable)';
const { serviceId, status, rownum, name, sex, birthday, tel, cardDate, disease, diseaseCase, drugs, present,
  remark, operation, visit, followUp } = config.ritField;
const CALL_BACK_STATUS = { save: 'save', submit: 'submit' };
const ORDER_STATUS = config.ORDER_STATUS;
/**
 * 用户信息表控件
 * 这个组件目前已经过于复杂了，设计之初并没有想到会如此，目前的优化方式是使用继承来分解组件的功能
 * BaseInfoTabel -> InfoTabelForWorker | InfoTableForDoctor
 * 但是改造至少需要一天时间，而且可能产生新的bug，所以懒得折腾
 * 
 * @class InfoTable
 * @extends {React.Component}
 */
class InfoTable extends React.Component {
  untreated = 0;
  treated = 0;
  allColumns = {
    [ rownum.key ]: {
      title: rownum.cn,
      width: 50,
      dataIndex: rownum.key,
      key: rownum.key,
    },
    [ name.key ]: {
      title: name.cn,
      width: 60,
      dataIndex: name.key,
      key: name.key,
    },
    [ sex.key ]: {
      title: sex.cn,
      width: 60,
      dataIndex: sex.key,
      key: sex.key,
    },
    [ birthday.key ]: {
      title: birthday.cn,
      width: 120,
      dataIndex: birthday.key,
      key: birthday.key,
    },
    [ tel.key ]: {
      title: tel.cn,
      width: 120,
      dataIndex: tel.key,
      key: tel.key,
    },
    [ cardDate.key ]: {
      title: cardDate.cn,
      width: 200,
      dataIndex: cardDate.key,
      key: cardDate.key,
    },
    [ disease.key ]: {
      title: disease.cn,
      width: 250,
      dataIndex: disease.key,
      key: disease.key,
    },
    [ diseaseCase.key ]: {
      title: diseaseCase.cn,
      width: 250,
      dataIndex: diseaseCase.key,
      key: diseaseCase.key,
    },
    [ drugs.key ]: {
      title: drugs.cn,
      width: 250,
      dataIndex: drugs.key,
      key: drugs.key,
    },
    [ present.key ]: {
      title: present.cn,
      width: 150,
      dataIndex: present.key,
      key: present.key,
      render: ( text, record, index ) => this.renderRadioCell( text, record[ rownum.key ], present.key )
    },
    [ visit.key ]: {
      title: visit.cn,
      width: 150,
      dataIndex: visit.key,
      key: visit.key,
      render: ( text, record, index ) => this.renderRadioCell( text, record[ rownum.key ], visit.key )
    },
    [ remark.key ]: {
      title: remark.cn,
      width: 250,
      dataIndex: remark.key,
      key: remark.key,
      render: ( text, record, index ) => this.renderSelectCell( text, record[ rownum.key ], remark.key )
    },
    [ followUp.key ]: {
      title: followUp.cn,
      width: 120,
      dataIndex: followUp.key,
      key: followUp.key,
      render: ( text, record, index ) => this.renderFollowUpCellCell( record, record[ rownum.key ], followUp.key )
    },
    [ operation.key ]: {
      title: operation.cn,
      width: 160,
      dataIndex: operation.key,
      key: operation.key,
      render: ( text, record, index ) => {
        const myStatus = record.myStatus;
        index = this.getFilterDataIndex( record[ rownum.key ] );
        return (
          <div className={ this.everyOneInEdit && myStatus !== config.ritStatus.editing ? 'hide' : '' }>
            {
              // 是否具有可编辑单元格
              this.monitor <= 0 ? '' :
                // 编辑状态
                myStatus === config.ritStatus.editing ?
                  <span>
                    <a onClick={ () => this.save( index ) }>保存</a>
                    &nbsp;|&nbsp;
                    <Popconfirm title="取消将不保存" onConfirm={ () => this.cancel( index ) }>
                      <a>取消</a>
                    </Popconfirm>
                    &nbsp;|&nbsp;
                  </span>
                  :
                  <span className={ this.state.operationStatus ? 'hide' : '' }>
                    <a onClick={ () => this.edit( index ) }>编辑</a>
                    &nbsp;|&nbsp;
                  </span>
            }
            <span className={ this.state.operationStatus ? 'hide' : '' }>
              <a onClick={ () => this.submit( index ) }
                style={ this.state.operationStatus ? { color: '#b1b8bd' } : { color: '#C00' } }>提交</a>
            </span>
            <a className={ !this.state.operationStatus ? 'hide' : '' }
              onClick={ () => this.revoke( index ) }>撤回</a>
          </div>
        );
      }
    }
  };

  constructor( props ) {
    super( props );
    fun.printLoader( moduleName );
    // 这个数值其实可以改进自动计算出来
    this.monitor = props.monitor;
    this.columnConfig = [];
    this.everyOneInEdit = false;
    this.parentName = props.name; // 父容器名称

    let formatData = this.getFormatData( props.data );
    let filterData = props.isOver ? formatData : this.getFilterData( formatData, props.orderStatus );

    this.state = {
      data: props.data, // 未处理过的数据
      formatData: formatData, // 用 getFormatData 函数处理过的 immutable 类型的数据
      filterData: filterData, // 用 getFilterData 函数处理过的 immutable 类型的数据
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        defaultCurrent: 1,
        total: 0,
        pageSize: 5,
      },
      saveCallback: this.props.onSave,
      submitCallback: this.props.onSubmit,
      callBackStatus: '', // 用户操作的类型：保存或者提交
      operationStatus: false, // 操作栏显示状态，doctor隐藏
      columns: this.getColums( props ),
      orderStatus: props.orderStatus,
    }
  }
  // public function
  /**
   * 获取用户信息表数据
   */
  getData = () => {
    let data = this.state.formatData.toJS();
    return data;
  }
  // private function
  /** 
   * 初始化数据，将可编辑的字段改为 object 类型，并将数据转换为 immutable 类型
   */
  getFormatData = ( data ) => {
    if ( typeof data !== 'undefined' && data.length > 0 ) {
      data = immutable.fromJS( data );
      data = data.map(( v, i ) => {
        v = v.set( 'myStatus', config.ritStatus.general );
        // 监听数量，代表每一列有多少个可编辑单元格，
        // 只有当所有单元格都触发了回调函数才会执行最终的保存或提交动作
        v = v.set( 'monitor', 0 );
        if ( !v.has( visit.key ) ) v = v.set( visit.key, '1' );
        if ( !v.has( present.key ) ) v = v.set( present.key, '1' );
        if ( !v.has( rownum.key ) ) v = v.set( rownum.key, i + 1 );
        return v;
      } );
    }
    else {
      data = immutable.fromJS( [] );
    }
    return data;
  };
  /**
   * 筛选出等于当前的订单状态值的数据
   */
  getFilterData = ( data, orderStatus ) => {
    let filterData = immutable.fromJS( [] );
    if ( data.size > 0 )
      filterData = data.filter( item => is( item.get( 'status' ), orderStatus ) );
    this.treated = orderStatus === ORDER_STATUS.treated ? filterData.size : data.size - filterData.size;
    this.untreated = data.size - this.treated;
    this.everyOneInEdit = false;

    return filterData;
  }
  /**
   * 获取表头数据
   */
  getColums = ( props ) => {
    this.columnConfig = props.userType === config.userType.doctor ?
      modular[ props.name ][ 'ritDoctor' ] : modular[ props.name ][ 'ritWorker' ];
    // 查看已完成订单时删除操作栏列
    if ( props.isOver ) {
      this.columnConfig = immutable.fromJS( this.columnConfig ).toJS();
      this.columnConfig.pop();
    }
    return this.columnConfig.map(( item, index, arr ) => {
      if ( this.allColumns.hasOwnProperty( item ) )
        return this.allColumns[ item ];
    } );
  }
  /**
   * 创建可编辑的 Input 单元格
   */
  renderInputCell = ( value, num, key ) => {
    let index = this.getFilterDataIndex( num );
    const myStatus = this.state.filterData.getIn( [ index, 'myStatus' ] );

    return ( <EditableInputCell
      name={ key + '_input_' + index }
      value={ value }
      onChange={ ( name, value ) => this.handleChange( name, key, index, value ) }
      onCancel={ () => this.handleCancel( index ) }
      myStatus={ myStatus }
    /> );
  }
  /**
   * 创建可编辑的 Select 单元格
   */
  renderSelectCell = ( value, num, key ) => {
    let index = this.getFilterDataIndex( num );
    const myStatus = this.state.filterData.getIn( [ index, 'myStatus' ] );

    return ( <EditableSelectCell
      name={ key + '_select_' + index }
      value={ value }
      onChange={ ( name, value ) => this.handleChange( name, key, index, value ) }
      onCancel={ () => this.handleCancel( index ) }
      myStatus={ myStatus }
    /> );
  }
  /**
   * 创建随访情况单元格
   */
  renderFollowUpCellCell = ( record, num, key ) => {
    let index = this.getFilterDataIndex( num );
    let disabled = this.props.isOver;
    if ( !disabled ) disabled = this.props.orderStatus === ORDER_STATUS.treated ? true : false;

    return ( <FollowUpCell
      name={ this.parentName }
      interviewScheme={ this.props.interviewScheme }
      scheme={ record[ followUp.key ] }
      callback={ ( rownum, data ) => this.updeteChildFormData( rownum, data ) }
      rownum={ record[ rownum.key ] }
      disabled={ disabled }
    /> );
  }
  /**
   * 创建可编辑的 Radio 单元格
   */
  renderRadioCell = ( value, num, key ) => {
    let index = this.getFilterDataIndex( num );
    const myStatus = this.state.filterData.getIn( [ index, 'myStatus' ] );

    return ( <EditableRadioCell
      name={ key + '_radio_' + index }
      value={ value }
      onChange={ ( name, value ) => this.handleChange( name, key, index, value ) }
      onCancel={ () => this.handleCancel( index ) }
      myStatus={ myStatus }
    /> );
  }
  /**
   * 取消编辑的回调函数，将该条数据的编辑状态修改成 显示状态
   */
  handleCancel = ( index ) => {
    let monitor = this.state.filterData.getIn( [ index, 'monitor' ] );
    monitor--;
    if ( monitor <= 0 ) {
      this.state.filterData = this.state.filterData.setIn( [ index, 'myStatus' ], config.ritStatus.general );
    }
  }
  /**
   * 操作栏按钮的点击的回调函数
   */
  handleChange = ( name, key, index, value ) => {
    const { filterData, callBackStatus, saveCallback, submitCallback } = this.state;
    let monitor = filterData.getIn( [ index, 'monitor' ] );
    monitor--;
    let data = filterData.setIn( [ index, 'monitor' ], monitor ).setIn( [ index, key ], value );

    // 更新 filterData 里的 monitor，value值其实应该在服务器端成功后再更新
    // 目前 save 方法是直接更新，submit 是等服务器端成功后才更新
    this.state.filterData = data;

    if ( monitor <= 0 ) {
      // 保存
      if ( callBackStatus === CALL_BACK_STATUS.save && typeof saveCallback === 'function' ) {
        let row = this.rebuildData( data.get( index ) );
        saveCallback( index, row.toJS() );
      }
      // 提交
      if ( callBackStatus === CALL_BACK_STATUS.submit && typeof submitCallback === 'function' ) {
        if ( !this.checkRemark( index, data.getIn( [ index, remark.key ] ) ) ) return;
        let row = this.rebuildData(
          data.setIn( [ index, status.key ], ORDER_STATUS.treated ).get( index ) );
        submitCallback( row.toJS(), ( id ) => { this.successCallback( id ) } );
      }
    }
    //更新 formatData，
    // 这个部分存在问题：
    // 1、在保存和提交前就更新了数据源，如果保存和提交服务器时候失败了，显示的数据已变化，服务器上的数据却未变
    // 是否应该有合理的方式来告知这些数据实际上并未更新成功？
    // 2、操作栏其实应该根据服务器成功与否来改变状态，比如点保存若服务器未正常相应，报错并停留在编辑状态下，
    // 但是如果一开始不改变数据，整个组件就不会刷新，这个问题有待更优雅的解决方式！
    // 或者应该是这样？ editing -> saving -> saved
    let i = this.getDataByServiceId( data.getIn( [ index, serviceId.key ] ) );
    if ( i >= 0 ) {
      let formatData = this.state.formatData.set( i, data.get( index ) );
      this.setState( { formatData: formatData } )
    }
    this.everyOneInEdit = false;
  }
  /**
   * 如果这个页面的表头含有 “通知情况”，要判断用户是否输入了，不然不允许提交
   */
  checkRemark = ( index, val ) => {
    let result = true;
    if ( this.columnConfig.includes( remark.key ) ) {
      if ( val === '' ) {
        fun.showNotification( '不允许提交！', '通知情况不允许留空，请填写后再提交。', 'warning' );
        this.edit( index );
        return false;
      }
    }
    return result;
  }
  /**
   * 重构数据，剔除掉提交时不需要的字段
   */
  rebuildData = ( item ) => {
    let row = Map( {} );
    let ritField = config.ritField;
    item.map(( v, k ) => {
      for ( let field in ritField ) {
        if ( ritField[ field ].key === k && ritField[ field ].need ) {
          row = row.set( k, v );
          break;
        }
      }
    } );
    return row;
  }
  /**
   * 点击编辑按钮
   */
  edit = ( index ) => {
    this.everyOneInEdit = true;
    this.setState( {
      filterData: this.state.filterData
        .setIn( [ index, 'myStatus' ], config.ritStatus.editing )
        .setIn( [ index, 'monitor' ], this.monitor )
    } );
  }
  /**
   * 确定保存：更新数据，并回到非编辑状态
   */
  save = ( index ) => {
    this.setState( {
      filterData: this.state.filterData.setIn( [ index, 'myStatus' ], config.ritStatus.general ),
      callBackStatus: CALL_BACK_STATUS.save
    } );
  }
  /**
   * 提交数据
   */
  submit = ( index ) => {
    const { filterData, submitCallback } = this.state;
    // 当前状态是显示，既未在编辑状态下，而是直接点击提交按钮
    if ( filterData.getIn( [ index, 'myStatus' ] ) === config.ritStatus.general ) {
      if ( !this.checkRemark( index, filterData.getIn( [ index, remark.key ] ) ) ) return;
      let row = this.rebuildData(
        filterData.setIn( [ index, status.key ], ORDER_STATUS.treated ).get( index ) ).toJS();
      if ( typeof submitCallback === 'function' )
        submitCallback( row, ( id ) => { this.successCallback( id ) } );
    }
    else {
      this.setState( {
        filterData: filterData.setIn( [ index, 'myStatus' ], config.ritStatus.general ),
        callBackStatus: CALL_BACK_STATUS.submit
      } );
    }
  }
  /**
   * 成功后调用
   */
  successCallback = ( id ) => {
    let index = this.getDataByServiceId( id );
    if ( index >= 0 ) {
      let formatData = this.state.formatData.updateIn( [ index, status.key ],
        v => v === ORDER_STATUS.treated ? ORDER_STATUS.untreated : ORDER_STATUS.treated );
      this.setState( {
        formatData: formatData,
        filterData: this.getFilterData( formatData, this.state.orderStatus )
      } );
      this.updateTreated();
    }
  }
  /**
   * 更新父组件的 已处理 和 未处理 的数值
   */
  updateTreated = () => {
    this.props.setTreated( this.untreated, this.treated );
  }
  /**
   * 撤销已处理的数据
   */
  revoke = ( index ) => {
    const { filterData, submitCallback } = this.state;
    let row = this.rebuildData( filterData.setIn( [ index, status.key ], ORDER_STATUS.untreated ).get( index ) );

    if ( typeof submitCallback === 'function' )
      submitCallback( row.toJS(), ( id ) => { this.successCallback( id ) } );
  }
  /**
   * 确认撤销：取消刚刚录入的数据，并回到非编辑状态
   */
  cancel = ( index ) => {
    this.everyOneInEdit = false;
    this.setState( {
      filterData: this.state.filterData.setIn( [ index, 'myStatus' ], config.ritStatus.cancel )
    } );
  }
  /**
   * 根据 serviceId 查找改数据在 formatData 中的下标
   */
  getDataByServiceId = ( id ) => {
    let index = -1;
    this.state.formatData.forEach(
      ( v, i ) => {
        if ( v.get( serviceId.key ) === id ) {
          index = i;
          return false;
        }
      }
    )
    if ( index < 0 ) console.error( "getDataByServiceId: 未找到数据！" )
    return index;
  }
  /**
   * 更新子表格的数据
   */
  updeteChildFormData = ( num, data ) => {
    let filterIndex = this.getFilterDataIndex( num );
    let formatIndex = parseInt( num ) - 1;
    let formatData = this.state.formatData.setIn( [ formatIndex, followUp.key ], data );
    let filterData = this.state.filterData.setIn( [ filterIndex, followUp.key ], data );
    this.setState( { formatData, filterData } );
  }
  /**
   * 根据rownum找到这条数据在 filterData 中的下标
   */
  getFilterDataIndex = ( num ) => {
    let index = -1;
    this.state.filterData.forEach(
      ( v, i ) => {
        if ( v.get( rownum.key ) === num ) {
          index = i;
          return false;
        }
      }
    )
    if ( index < 0 ) console.error( "getFilterDataIndex: 未找到数据！" )
    return index;
  }

  render() {
    return (
      <Table className={ styles.table } bordered columns={ this.state.columns } rowKey="rownum"
        dataSource={ this.state.filterData.size > 0 ? this.state.filterData.toJS() : [] }
        size="middle" pagination={ this.state.pagination } />
    )
  }

  componentWillReceiveProps( nextProps ) {
    let operationStatus = nextProps.orderStatus === ORDER_STATUS.treated ? true : false;
    let columns = [];
    let filterData = [];
    if ( nextProps.name != this.parentName ) {
      columns = this.getColums( nextProps );
    }

    // 有新数据进来
    if ( !is( immutable.fromJS( nextProps.data ), immutable.fromJS( this.state.data ) ) ||
      nextProps.name != this.parentName ) {
      let formatData = this.getFormatData( nextProps.data );
      if ( nextProps.userType === config.userType.worker ) {
        filterData = this.getFilterData( formatData, nextProps.orderStatus );
      } else {
        filterData = formatData;
      }

      if ( columns.length > 0 ) {
        this.parentName = nextProps.name;
        this.setState( {
          data: nextProps.data,
          formatData: formatData,
          filterData: filterData,
          operationStatus: operationStatus,
          columns: columns
        } );
      }
      else {
        this.setState( {
          data: nextProps.data,
          formatData: formatData,
          filterData: filterData,
          operationStatus: operationStatus,
        } );
      }
    }
    else {
      // 切换了订单状态
      if ( nextProps.orderStatus !== this.state.orderStatus ) {
        this.setState( {
          filterData: this.getFilterData( this.state.formatData, nextProps.orderStatus ),
          orderStatus: nextProps.orderStatus,
          operationStatus: operationStatus,
        } );
      }
    }
  }

  componentWillMount() {
    this.updateTreated();
  }
}

export default InfoTable;