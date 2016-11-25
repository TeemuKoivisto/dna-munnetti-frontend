import {
  LOGIN_USER,
} from "actions/auth";

const INITIAL_STATE = {
  user: {},
  token: "",
  loading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // case "@@redux/INIT":
      // return Object.assign({}, state, { loading: false });
    case "LOGIN_USER_REQUEST":
      return Object.assign({}, state, { loading: true });
    case "LOGIN_USER_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGIN_USER_FAIL":
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
}
