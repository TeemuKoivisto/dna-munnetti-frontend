import React from "react";
import { browserHistory, Link } from "react-router";

export class NavBar extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    browserHistory.push("/login");
  }

  renderNonLoggedNav() {
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/">FrontPage</Link>
        <Link className="item" to="/login">Login</Link>
        <Link className="item" to="/registration">Register</Link>
      </div>
    );
  }

  renderUserNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/">FrontPage</Link>
        <Link className="item" to="/user/me">{ user.firstname }</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }

  renderAdminNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/">FrontPage</Link>
        <Link className="item" to="/user/me">{ user.firstname }</Link>
        <Link className="item" to="/user">All users</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }

  renderNav() {
    const isAdmin = this.props.user.role === "admin";
    return (
      <div>
        { isAdmin ? this.renderAdminNav() : this.renderUserNav() }
      </div>
    );
  }

  render() {
    console.log(this.props.user)
    const loggedIn = this.props.user.role !== undefined;
    return (
      <div id="nav">
        { loggedIn ? this.renderNav() : this.renderNonLoggedNav() }
      </div>
    );
  }
}

import { connect } from "react-redux";

import { logout } from "state/auth/auth.actions";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
