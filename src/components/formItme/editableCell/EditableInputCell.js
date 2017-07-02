import { Input } from 'antd';
import { EditableCell } from '../../base';
import { config, fun } from '../../../common';

/**
 * 可编辑的 Input 组件
 */
export default class EditableInputCell extends EditableCell {
  constructor( props ) {
    super( props );
  }

  render() {
    const { myStatus, value } = this.state;
    // fun.print( myStatus, 'render', this.name );
    return (
      <div>
        {
          myStatus === config.ritStatus.editing ?
            <div>
              <Input
                value={ value } size="small"
                onChange={ e => this.handleChange( e ) }
              />
            </div>
            : value || ''
        }
      </div>
    );
  }
}