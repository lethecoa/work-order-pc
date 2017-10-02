import React from 'react';
import {connect} from 'dva';

const WorkerAccount = ({}) => {

  return (
    <div>
      WorkerAccount
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(WorkerAccount);
