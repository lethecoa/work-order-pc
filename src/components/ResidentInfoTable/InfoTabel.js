import React from 'react';
import { Table, Pagination, Popconfirm } from 'antd';
import immutable from 'immutable';
import { config, fun, modular } from '../../common';
import styles from './InfoTable.less';
import EditableInputCell from './EditableInputCell';
import EditableRadioCell from './EditableRadioCell';
import FollowUpCell from './FollowUpCell';

const { is, Map } = immutable;
const moduleName = '信息表控件(infoTable)';
const { serviceId, status, rownum, name, sex, birthday, tel, cardDate, disease, diseaseCase, drugs, present,
  remark, operation, visit, followUp } = config.ritField;
const CALL_BACK_STATUS = { save: 'save', submit: 'submit' };
const ORDER_STATUS = config.ORDER_STATUS;
/**
 * 用户信息表控件
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
      width: 280,
      dataIndex: disease.key,
      key: disease.key,
    },
    [ diseaseCase.key ]: {
      title: diseaseCase.cn,
      width: 280,
      dataIndex: diseaseCase.key,
      key: diseaseCase.key,
    },
    [ drugs.key ]: {
      title: drugs.cn,
      width: 280,
      dataIndex: drugs.key,
      key: drugs.key,
    },
    [ present.key ]: {
      title: present.cn,
      width: 150,
      dataIndex: present.key,
      key: present.key,
      render: ( text, record, index ) => this.renderRadioCell( text, index, present.key )
    },
    [ visit.key ]: {
      title: visit.cn,
      width: 150,
      dataIndex: visit.key,
      key: visit.key,
      render: ( text, record, index ) => this.renderRadioCell( text, index, visit.key )
    },
    [ remark.key ]: {
      title: remark.cn,
      width: 280,
      dataIndex: remark.key,
      key: remark.key,
      render: ( text, record, index ) => this.renderInputCell( text, index, remark.key )
    },
    [ followUp.key ]: {
      title: followUp.cn,
      width: 120,
      dataIndex: followUp.key,
      key: followUp.key,
      render: ( text, record, index ) => this.renderFollowUpCellCell( text, index, followUp.key )
    },
    [ operation.key ]: {
      title: operation.cn,
      width: 160,
      dataIndex: operation.key,
      key: operation.key,
      render: ( text, record, index ) => {
        const myStatus = record.myStatus;
        return (
          <div className="editable-row-operations">
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
    this.hasChildFrom = false;

    let formatData = this.getFormatData( props.data );
    let filterData = props.isOver ? formatData :
      this.getFilterData( formatData, props.orderStatus );

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
      columns: this.getColums(),
      parentName: props.name,
      orderStatus: props.orderStatus, // 订单状态：已处理、未处理
      isOver: props.isOver || false,
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

    return filterData;
  }
  /**
   * 获取表头数据
   */
  getColums = () => {
    let columnConfig = this.props.userType === config.userType.doctor ?
      modular[ this.props.name ][ 'ritDoctor' ] : modular[ this.props.name ][ 'ritWorker' ];
    // 查看已完成订单时删除操作栏列
    if ( this.props.isOver ) {
      columnConfig = immutable.fromJS( columnConfig ).toJS();
      columnConfig.pop();
    }
    this.hasChildFrom = columnConfig.hasOwnProperty( followUp.key ) ? true : false;
    return columnConfig.map(( item, index, arr ) => {
      if ( this.allColumns.hasOwnProperty( item ) )
        return this.allColumns[ item ];
    } );
  }
  /**
   * 创建可编辑的 Input 单元格
   */
  renderInputCell = ( value, index, key ) => {
    const myStatus = this.state.filterData.getIn( [ index, 'myStatus' ] );

    return ( <EditableInputCell
      name={ key + '_input_' + index }
      value={ value }
      onChange={ ( name, value ) => this.handleChange( name, key, index, value ) }
      myStatus={ myStatus }
    /> );
  }
  /**
   * 创建随访情况单元格（未完成）
   */
  renderFollowUpCellCell = ( value, index, key ) => {
    return ( <FollowUpCell
      name={ this.props.name }
      interviewScheme={ this.props.interviewScheme }
      scheme={ this.props.scheme }
      callback={ ( index, data ) => this.updeteChildFormData( index, data ) }
      index={ index }
      rownum={ this.state.filterData.getIn( [ index, rownum.key ] ) }
    /> );
  }
  /**
   * 创建可编辑的 Radio 单元格
   */
  renderRadioCell = ( value, index, key ) => {
    const myStatus = this.state.filterData.getIn( [ index, 'myStatus' ] );

    return ( <EditableRadioCell
      name={ key + '_radio_' + index }
      value={ value }
      onChange={ ( name, value ) => this.handleChange( name, key, index, value ) }
      myStatus={ myStatus }
    /> );
  }
  /**
   * 可编辑的子组件的数据发生更改时
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
        let row = this.rebuildData(
          data.setIn( [ index, status.key ], ORDER_STATUS.treated ).get( index ) );
        submitCallback( row.toJS(), ( id ) => { this.successCallback( id ) } );
      }
      // 更新 formatData
      let i = this.getDataByServiceId( data.getIn( [ index, serviceId.key ] ) );
      if ( i >= 0 ) {
        let formatData = this.state.formatData.set( i, data.get( index ) );
        this.setState( {
          formatData: formatData,
          // filterData: this.getFilterData( formatData, this.state.orderStatus )
        } )
      }
    }
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
      let row = this.rebuildData(
        filterData.setIn( [ index, status.key ], ORDER_STATUS.treated ).get( index ) ).toJS();
      // if ( this.hasChildFrom ) row.scheme =
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
    // let i = this.getDataByServiceId( filterData.getIn( [ index, serviceId.key ] ) );
    // let ftd = formatData.setIn( [ i, status.key ], ORDER_STATUS.untreated );
    let row = this.rebuildData( filterData.setIn( [ index, status.key ], ORDER_STATUS.untreated )
      .get( index ) );
    // this.setState( { formatData: ftd } );

    if ( typeof submitCallback === 'function' )
      submitCallback( row.toJS(), ( id ) => { this.successCallback( id ) } );
  }
  /**
   * 确认撤销：取消刚刚录入的数据，并回到非编辑状态
   */
  cancel = ( index ) => {
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
    return index;
  }
  /**
   * 
   */
  updeteChildFormData = ( index, data ) => {
    let filterData = this.state.filterData.setIn( [ index, followUp.key ], data );
    this.setState( { filterData: filterData } );
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
    if ( nextProps.name != this.state.parentName ) {
      columns = this.getColums()
    }
    // 有新数据进来
    if ( !is( nextProps.data, this.state.data ) ) {
      let formatData = this.getFormatData( nextProps.data );
      if ( nextProps.userType === config.userType.worker ) {
        filterData = this.getFilterData( formatData, nextProps.orderStatus );
      } else {
        filterData = formatData;
      }

      if ( columns.length > 0 ) {
        this.setState( {
          data: nextProps.data,
          formatData: formatData,
          filterData: filterData,
          operationStatus: operationStatus,
          columns: this.getColums()
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