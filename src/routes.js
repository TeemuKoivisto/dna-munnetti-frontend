import React from "react";
import { Route } from "react-router";

import { redirectNonUser, redirectNonAdmin } from "./middleware/restrictAccess";

import App from "./components/app/App";
import FrontPage from "./components/app/FrontPage";
import NotFound from "./components/app/NotFound";

import Map from "components/map/Map";
import Map2 from "components/map/Map2";
import Map3 from "components/map/Map3";
import Map4 from "components/map/Map4";
import Plot from "components/map/Plot";

export default (
  <Route>
    <Route path="" component={App}>
      <Route path="/" component={FrontPage} />
      <Route path="/map" component={Map} />
      <Route path="/map2" component={Map2} />
      <Route path="/map3" component={Map3} />
      <Route path="/map4" component={Map4} />
      <Route path="/plot" component={Plot} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
