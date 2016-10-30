import { browserHistory } from "react-router";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    return dispatch(loginAction(email, password)).then((action) => {
      if (action.type === "LOGIN_USER_SUCCESS") {
        browserHistory.push("/user/me");
      }
      return action;
    })
  };
}

const loginAction = (email, password) => (
  {
    type: LOGIN_USER,
    payload: {
      request: {
        url: "/login",
        method: "post",
        data: {
          email,
          password
        }
      }
    }
  }
);

export const logout = () => (
  {
    type: LOGOUT_USER,
  }
)
