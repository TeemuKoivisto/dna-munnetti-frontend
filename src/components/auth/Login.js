import React from "react";
import { browserHistory } from "react-router";
import Validate from "../../react-redux-validate/Validate";

export class Login extends React.Component {

  handleChange(name, event) {
    event.preventDefault();
    // console.log(this.props)
    // console.log(Validate.getForm("loginForm"))
    // console.log(Validate.getFormField("loginForm", "email"))
    Validate.updateForm("loginForm", name, event.target.value);
    console.log("dem props", this.props)
    // this.setState({});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (Validate.isFormValid("loginForm")) {
      const { email, password } = this.props.form.values;
      this.props.loginUser(email, password);
    }
  }

  render() {
    const { loading } = this.props;
    console.log("rendering, props: ", this.props)
    const loginForm = this.props.form.values;
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
                    value={loginForm.email}
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
                    value={loginForm.password}
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

import createForm from "../../react-redux-validate/CreateForm";

const LoginWithForm = createForm({
  form: "loginForm",
  model: "loginUser",
})(Login)

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm)
