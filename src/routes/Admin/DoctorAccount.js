import React from 'react';
import {connect} from 'dva';

const DoctorAccount = ({}) => {

  return (
    <div>
      DoctorAccount
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(DoctorAccount);
