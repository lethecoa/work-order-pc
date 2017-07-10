import { EditableCell } from '../../base';
import { config, fun } from '../../../common';
import { Select } from 'antd';
const Option = Select.Option;

/**
 * 可编辑的 Select 组件
 */
export default class EditableSelectCell extends EditableCell {
  options = [ '已通知', '致电三次未果', '处理中' ];

  constructor( props ) {
    super( props );
  }

  /** @override */
  handleChange( v ) {
    this.setState( { value: v } );
  }

  render() {
    const { myStatus, value } = this.state;
    return (
      <div>
        {
          myStatus === config.ritStatus.editing ?
            <Select mode='combobox' size="small" value={ value }
              onChange={ v => this.handleChange( v ) } allowClear='true'
            >
              {
                this.options.map(( item, index, arr ) => {
                  return <Option key={ item }>{ item }</Option>
                } )
              }
            </Select>
            : value || ''
        }
      </div>
    );
  }
}