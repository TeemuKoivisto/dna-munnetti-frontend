import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";

import store from "./store";
import routes from "./routes";

const container = document.getElementById("app");
const Root = (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>
);

ReactDOM.render(Root, container);
