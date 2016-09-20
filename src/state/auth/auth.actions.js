export const LOGIN_USER = "LOGIN_USER";

// export const loginUser = (email, password) => (
//
//   // Invert control!
//   // Return a function that accepts `dispatch` so we can dispatch later.
//   // Thunk middleware knows how to turn thunk async actions into actions.
//
//   function (dispatch) {
//     return fetchSecretSauce().then(
//       sauce => dispatch(makeASandwich(forPerson, sauce)),
//       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//     );
//   };
// }

export const loginUser = (email, password) => (
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
