import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from "./IndexPage/IndexPage";
import Users from "./users/Users";
import Login from "./Login/Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default RouterConfig;