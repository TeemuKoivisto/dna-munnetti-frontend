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

// updates everything defined in this file when changes are made
// in the other end webpack-hot-middleware triggers browser-window to update
if (module.hot) {
  module.hot.accept();
}
