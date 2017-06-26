import BaseCell from './BaseEditableCell';
import { Radio } from 'antd';
import { config, fun } from '../../common';

const RadioGroup = Radio.Group;
const DEFAULT_VALUE = '1';

/**
 * 可编辑的 Radio 组件
 */
class EditableRadioCell extends BaseCell {
  constructor( props ) {
    super( props );
    this.cacheValue = props.value || DEFAULT_VALUE;
  }

  render() {
    const { myStatus, value } = this.state;
    return (
      <div>
        {
          myStatus === config.ritStatus.editing ?
            <div>
              <RadioGroup value={value === '0' ? '0' : '1'} onChange={e => this.handleChange( e )}>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            </div>
            :
            <div>
              {value === '0' ? '否' : '是'}
            </div>
        }
      </div>
    );
  }
}

export default EditableRadioCell;