import React from "react";
import { browserHistory } from "react-router";
import Validate from "../../react-form-validate/Validate";

export class Login extends React.Component {
  // constructor() {
  //   super();
  //   Validate.createForm("loginForm", "loginUser");
  // }
  handleChange(name, event) {
    event.preventDefault();
    // console.log(Validate.getForm("loginForm"))
    // console.log(Validate.getFormField("loginForm", "email"))
    this.props.updateForm(name, event.target.value);
    // console.log("dem props", this.props)
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (Validate.isFormValid("loginForm")) {
    if (this.props.isFormValid()) {
      // const { email, password } = Validate.getFormValues("loginForm");
      const { email, password } = this.props.form.values;
      this.props.loginUser(email, password);
    }
  }

  render() {
    const { loading } = this.props;
    console.log("rendering, props: ", this.props)
    const { email, password } = this.props.form.values;
    return (
      <form className="ui middle aligned center aligned grid" onSubmit={this.handleSubmit.bind(this)}>
        <div className="ui">
          <div className="ui large form">
            <div className="ui stacked segment">
              <div className="field error">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    value={email}
                    onChange={this.handleChange.bind(this, "email")}
                  />
                </div>
              </div>
              <div className="field error">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange.bind(this, "password")}
                  />
                </div>
              </div>
            </div>
            { loading ?
              <div className="ui blue active centered inline loader"></div>
                :
              <button className="ui fluid large blue submit button" type="submit">Log In</button>
            }
          </div>
        </div>
      </form>
    );
  }
}

import { connect } from "react-redux";

import { loginUser } from "state/auth/auth.actions";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(email, password) {
    dispatch(loginUser(email, password));
  },
});

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

import createForm from "../../react-form-validate/CreateForm";

// const LoginWithForm = createForm({
//   form: "loginForm",
//   model: "loginUser",
// })(Login)
//
// export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm)

export default createForm({
  form: "loginForm",
  model: "loginUser",
})(connect(mapStateToProps, mapDispatchToProps)(Login))
