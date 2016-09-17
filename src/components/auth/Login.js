import React from "react";
import { browserHistory } from "react-router";

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUser: {
        email: "",
        password: "",
      },
    };
  }

  handleChange(name, event) {
    // Validate.updateForm("loginUser", name, event.target.value);
  }

  handleClick(event) {
    event.preventDefault();
    // if (Validate.isFormValid("loginUser")) {
    //   this.props.loginUser(this.state.loginUser.values);
    // }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
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
                    value={ this.state.loginUser.email }
                    onChange={ this.handleChange.bind(this, "email") }
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
                    value={ this.state.loginUser.password }
                    onChange={ this.handleChange.bind(this, "password") }
                  />
                </div>
              </div>
            </div>
            <div className="ui fluid large blue submit button" onClick={this.handleClick.bind(this)}>
              Login
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { loginUser } from "../../state/auth/auth.actions";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(email, password) {
    dispatch(loginUser(email, password));
  },
});

export default connect(mapStateToProps, null)(Login);
