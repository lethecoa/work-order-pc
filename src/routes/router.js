import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from "./indexPage/IndexPage.js";
import Users from "./users/Users.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
    </Router>
  );
}

export default RouterConfig;