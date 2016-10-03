import { createStore, combineReducers,
  applyMiddleware, compose } from "redux";
import persistState from "redux-localstorage";

import thunk from "redux-thunk";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import logger from "./middleware/logger";
import { handleRequest } from "./middleware/apiMiddleware";

import reducers from "./state";

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return combinedReducers(undefined, action);
  }
  return combinedReducers(state, action);
};

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: process.env.API_URL,
  responseType: 'json'
});

const createStoreWithMiddleware = applyMiddleware(thunk, handleRequest, logger)(createStore);
const createPersistentStore = compose(
  persistState(["auth"])
)(createStoreWithMiddleware);
const store = createPersistentStore(rootReducer);

export default store;
