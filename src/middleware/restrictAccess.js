import store from "../store";

export const redirectNonUser = (nextState, replace) => {
  const user = store.getState().auth.user;
  if (user.role === undefined) {
    replace({
      pathname: "/login",
    });
  }
};

export const redirectNonAdmin = (nextState, replace) => {
  const user = store.getState().auth.user;
  if (user.role !== "admin") {
    replace({
      pathname: "/login",
    });
  }
};
