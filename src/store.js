import { createStore, combineReducers,
  applyMiddleware, compose } from "redux";
import persistState from "redux-localstorage";

import thunk from "redux-thunk";

import logger from "./middleware/logger";
import { handleRequest } from "./middleware/apiMiddleware";

import reducers from "reducers";

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return combinedReducers(undefined, action);
  }
  return combinedReducers(state, action);
};

const createStoreWithMiddleware = applyMiddleware(thunk, handleRequest, logger)(createStore);
const createPersistentStore = compose(
  persistState(["auth"])
)(createStoreWithMiddleware);
const store = createPersistentStore(rootReducer);

export default store;
