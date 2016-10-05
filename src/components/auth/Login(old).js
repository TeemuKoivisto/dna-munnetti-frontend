// import React from "react";
// import { browserHistory } from "react-router";
// import { Field, reduxForm } from "redux-form";
//
// function submit(values) {
//   console.log("hi", values)
//   this.props.loginUser(values.email, values.password)
// }
//
// const renderError = ({ meta: { touched, error } }) => touched && error ?
//   <div className="">
//     {error}
//   </div>
//     :
//   false
//
// export class Login extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       loginUser: {
//         email: "",
//         password: "",
//       },
//     };
//   }
//
//   handleChange(name, event) {
//     this.state.loginUser[name] = event.target.value;
//     this.setState({});
//     // Validate.updateForm("loginUser", name, event.target.value);
//   }
//
//   handleClick(event) {
//     event.preventDefault();
//     // this.props.loginUser(this.state.loginUser.email, this.state.loginUser.password)
//     this.props.handleSubmit(values => {
//       console.log("hi", values)
//       this.props.loginUser(values.email, values.password)
//     });
//       // .then((thing) => {
//       //   console.log(thing);
//       // })
//     // if (Validate.isFormValid("loginUser")) {
//     //   this.props.loginUser(this.state.loginUser.values);
//     // }
//   }
//
//   onSubmit(event) {
//     event.preventDefault();
//     console.log("Hei")
//     debugger;
//   }
//
//   ubmit(event) {
//     event.preventDefault();
//     console.log("lol")
//     console.log(event)
//     console.log(this.props)
//   }
//
//   render() {
//     const { loading } = this.props;
//     const { handleSubmit, onSubmit, pristine, reset, submitting } = this.props;
//     return (
//       <form className="ui middle aligned center aligned grid" onSubmit={this.ubmit.bind(this)}>
//         <div className="ui">
//           <div className="ui large form">
//             <div className="ui stacked segment">
//               <div className="field error">
//                 <div className="ui left icon input">
//                   <i className="mail icon"></i>
//                   <Field
//                     component="input"
//                     type="text"
//                     name="email"
//                     placeholder="E-mail address"
//                   />
//                   <Field name="email" component={renderError}/>
//                 </div>
//               </div>
//               <div className="field error">
//                 <div className="ui left icon input">
//                   <i className="lock icon"></i>
//                   <Field
//                     component="input"
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <Field name="password" component={renderError}/>
//                 </div>
//               </div>
//             </div>
//             { loading ?
//               <div className="ui blue active centered inline loader"></div>
//                 :
//               <button type="submit" disabled={submitting}>Log In</button>
//             }
//           </div>
//         </div>
//       </form>
//     );
//   }
// }
//
// import { connect } from "react-redux";
//
// import { loginUser } from "state/auth/auth.actions";
//
// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//     loading: state.auth.loading,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => ({
//   loginUser(email, password) {
//     dispatch(loginUser(email, password));
//   },
// });
//
// // export default connect(mapStateToProps, mapDispatchToProps)(Login);
//
// const validate = values => {
//   const errors = {}
//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//   if (!values.password) {
//     errors.age = 'Required'
//   } else if (values.password.length < 8) {
//     errors.age = 'Must be over 8 characters';
//   }
//   return errors
// }
//
// export default reduxForm({
//   form: 'simple',
//   validate,
// })(connect(mapStateToProps, mapDispatchToProps)(Login))
