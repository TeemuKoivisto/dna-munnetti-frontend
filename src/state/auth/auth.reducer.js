import {
  LOGIN_USER,
} from "./auth.actions";

const INITIAL_STATE = {
  user: {},
  token: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return {
        user: action.payload.data.user,
        token: action.payload.data.token,
      };
    default:
      return state;
  }
}
