export const GET_USER = "GET_USER";

export const getUsers = () => (
  {
    type: GET_USER,
    payload: {
      url: "/user",
      method: "get",
      data: {}
    }
  }
);
