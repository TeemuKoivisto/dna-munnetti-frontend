import React from "react";

export class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      newUser: Validate.createForm("newUser", "user"),
    };
  }

  // componentWillMount() {
  //   Validate.subscribeToForm("newUser", "u", (newUser) => { this.setState({ newUser, });});
  // }
  //
  // componentWillUnmount() {
  //   Validate.unsubscribe("u");
  // }

  handleChange(name, event) {
    Validate.updateForm("newUser", name, event.target.value);
    if (name === "password") {
      Validate.updateForm("newUser", "passwordConf", Validate.getFormField("newUser", "passwordConf"));
    }
  }

  handleClick(type, event) {
    if (Validate.isFormValid("newUser")) {
      this.props.registerUser(this.state.newUser.values);
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui">
          <div className="ui large form stacked segment">
            <div className="field error">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={ this.state.newUser.values.firstname }
                  onChange={ this.handleChange.bind(this, "firstname") }
                />
              </div>
            </div>
            <div className="field error">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={ this.state.newUser.values.lastname }
                  onChange={ this.handleChange.bind(this, "lastname") }
                />
              </div>
            </div>
            <div className="field error">
              <div className="ui left icon input">
                <i className="mail icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  value={ this.state.newUser.values.email }
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
                  value={ this.state.newUser.values.password }
                  onChange={ this.handleChange.bind(this, "password") }
                />
              </div>
            </div>
            <div className="field error">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="confPassword"
                  placeholder="Confirm password"
                  value={ this.state.newUser.values.passwordConf }
                  onChange={ this.handleChange.bind(this, "passwordConf") }
                />
              </div>
            </div>
            <div className="ui fluid large blue submit button" onClick={this.handleClick.bind(this, "submit")}>
              Register
            </div>
          </div>
          <Errors errors={this.state.newUser.errors}/>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";

import { registerUser } from "state/user/user.actions";

const mapDispatchToProps = (dispatch) => ({
  registerUser(newUser) {
    dispatch(registerUser(newUser));
  },
});


export default connect(null, mapDispatchToProps)(UserRegistration);
