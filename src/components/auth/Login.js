import React from "react";
import { browserHistory } from "react-router";
import Validate from "../../react-redux-validate/Validate";

export class Login extends React.Component {

  handleChange(name, event) {
    event.preventDefault();
    console.log(Validate.getForm("loginForm"))
    Validate.updateForm("loginForm", name, event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (Validate.isFormValid("loginForm")) {
      console.log("lol")
      const values = Validate.getFormValues("loginForm");
      this.props.loginUser(values.email, values.password);
    }
  }

  render() {
    const { loading } = this.props;
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
                    onChange={this.handleChange.bind(this, "password")}
                  />
                </div>
              </div>
            </div>
            { loading ?
              <div className="ui blue active centered inline loader"></div>
                :
              <button type="submit">Log In</button>
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

export default createForm({
  form: "loginForm",
  model: "loginUser",
})(connect(mapStateToProps, mapDispatchToProps)(Login))
