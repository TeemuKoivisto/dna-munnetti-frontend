export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (email, password) => (
  {
    type: LOGIN_USER,
    payload: {
      url: "/login",
      method: "post",
      data: {
        email,
        password
      }
    }
  }
);
