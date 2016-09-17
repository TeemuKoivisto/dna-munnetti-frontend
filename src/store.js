import { createStore, combineReducers,
  applyMiddleware, compose } from "redux";

import reducers from "./state";

const combinedReducers = combineReducers(reducers);

const store = createStore(combinedReducers);

export default store;
