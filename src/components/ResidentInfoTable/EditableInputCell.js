import { Input } from 'antd';
import { config, fun } from '../../common';

class EditableInputCell extends React.Component {
  constructor( props ) {
    super( props );
    this.cacheValue = '';
    this.state = {
      name: props.name,
      value: props.value,
      myStatus: props.myStatus || config.ritStatus.general
    }
  }

  componentWillReceiveProps( nextProps ) {
    // console.log( 'componentWillReceiveProps', nextProps )
    if ( nextProps.myStatus !== this.state.myStatus ) {
      if ( nextProps.myStatus === config.ritStatus.general ) {
        this.setState( { myStatus: nextProps.myStatus } );
        this.props.onChange( this.state.value );
        this.cacheValue = this.state.value;
      }
      else if ( nextProps.myStatus === config.ritStatus.editing ) {
        this.setState( { myStatus: nextProps.myStatus, value: nextProps.value } );
      }
      else {
        this.setState( { myStatus: nextProps.myStatus, value: this.cacheValue } );
        this.props.onChange( this.cacheValue );
      }
    }
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextProps.myStatus !== this.state.myStatus ||
      nextState.value !== this.state.value;
  }

  handleChange( e ) {
    const value = e.target.value;
    this.setState( { value } );
  }
  render() {
    const { myStatus, value } = this.state;
    // fun.print( myStatus, 'render', this.state.name );
    return (
      <div>
        {
          myStatus === config.ritStatus.editing ?
            <div>
              <Input
                value={value} size="small"
                onChange={e => this.handleChange( e )}
              />
            </div>
            : value || ''
        }
      </div>
    );
  }
}

export default EditableInputCell;