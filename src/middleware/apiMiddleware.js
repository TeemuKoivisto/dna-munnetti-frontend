import axios from "axios";

export const createRequest = (action, store) => {
  // dispatches first e.g. LOGIN_USER_REQUEST type of action
  // so that state can block extra requests / set a loading bar or something
  store.dispatch({
    type: action.type + "_REQUEST",
  });

  const token = store.getState().auth.token;
  const request = action.payload.request;

  return axios({
    method: request.method,
    url: process.env.API_URL + request.url,
    data: request.data,
    headers: {
      "X-Access-Token": token,
    },
    responseType: request.responseType === undefined ? "json" : request.responseType,
  })
  .then(res => {
    const newAction = {
      type: action.type + "_SUCCESS",
      payload: res.data,
    }
    store.dispatch(newAction);
    return newAction;
  })
  .catch(err => {
    let data;
    if (request.responseType === "arraybuffer") {
      const arr = new Uint8Array(err.data);
      const str = String.fromCharCode.apply(String, arr);
      data = JSON.parse(str);
    } else {
      data = err.data;
    }
    const newAction = {
      type: action.type + "_FAIL",
      error: err,
    }
    store.dispatch(newAction);
    return newAction;
  });
};

export const handleRequest = store => next => action => {
  next(action);
  if (action.payload && action.payload.request) {
    return createRequest(action, store);
  }
};
