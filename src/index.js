import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from "dva/router";
import { message } from "antd";
import './index.less';

// 1. Initialize
const app = dva( {
  history: browserHistory,
  onError( error ) {
    message.error( error.message )
  },
} );

// 2. Plugins
app.use( createLoading() );

// 3. Model
app.model( require( "./models/appModel" ) );

// 4. Router
app.router( require( './routes/router' ) );

// 5. Start
app.start( '#root' );
