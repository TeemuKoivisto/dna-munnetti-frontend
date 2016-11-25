import React from "react";
import { Route } from "react-router";

import { redirectNonUser, redirectNonAdmin } from "./middleware/restrictAccess";

import App from "./components/app/App";
import FrontPage from "./components/app/FrontPage";
import NotFound from "./components/app/NotFound";

import Map from "components/map/Map";

export default (
  <Route>
    <Route path="" component={App}>
      <Route path="/" component={FrontPage} />
      <Route path="/map" component={Map} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
