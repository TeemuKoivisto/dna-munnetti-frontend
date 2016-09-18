import React from "react";
import { Route } from "react-router";

import { redirectNonUser, redirectNonAdmin } from "./middleware/restrictAccess";

import App from "./components/app/App";
import FrontPage from "./components/app/FrontPage";
import UserShow from "./components/user/UserShow";
// import UserList from "./user/UserList";
import Login from "./components/auth/Login";
// import Registration from "./auth/Registration";
import NotFound from "./components/app/NotFound";

export default (
  <Route>
    <Route path="" component={App}>
      <Route path="/" component={FrontPage} />
      <Route path="/user/me" component={UserShow} onEnter={redirectNonUser} />
      {/*<Route path="user" component={UserList} onEnter={redirectNonAdmin} />*/}
      <Route path="/login" component={Login} />
      {/*<Route path="register" component={Registration} />*/}
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
