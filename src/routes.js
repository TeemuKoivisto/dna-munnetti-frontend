import React from "react";
import { Route } from "react-router";

import { redirectNonUser, redirectNonAdmin } from "./middleware/restrictAccess";

import App from "./components/app/App";
import FrontPage from "./components/app/FrontPage";
import NotFound from "./components/app/NotFound";

import Map from "components/map/Map";
import Map2 from "components/map/Map2";

export default (
  <Route>
    <Route path="" component={App}>
      <Route path="/" component={FrontPage} />
      <Route path="/map" component={Map} />
      <Route path="/map2" component={Map2} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
