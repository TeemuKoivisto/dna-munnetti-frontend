import React from "react";
import { browserHistory, Link } from "react-router";
// import { logout } from "../auth/auth.actions";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

/*
* The handler method for handling the actions for when the logout button is clicked.
*/
  handleLogout() {
    this.props.logout();
    browserHistory.push("/login");
  }

  renderNonLoggedNav() {
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/login">Login</Link>
        <Link className="item" to="/registration">Register</Link>
      </div>
    );
  }

  renderUserNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/user/me">{ `${user.firstname} ${user.lastname}` }</Link>
        <Link className="item" to="/thesis">Theses</Link>
        <Link className="item" to="/thesis/new">Add new thesis</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }

  renderPrintPersonNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/user/me">{ `${user.firstname} ${user.lastname}` }</Link>
        <Link className="item" to="/thesis">Theses</Link>
        <Link className="item" to="/councilmeeting/next">Next meeting</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }

  renderAdminNav() {
    const { user } = this.props;
    return (
      <div className="ui horizontal pointing menu">
        <Link className="item" to="/user/me">{ `${user.firstname} ${user.lastname}` }</Link>
        <Link className="item" to="/thesis">Theses</Link>
        <Link className="item" to="/thesis/new">Add new thesis</Link>
        <Link className="item" to="/councilmeeting">Councilmeetings </Link>
        <Link className="item" to="/councilmeeting/next">Next meeting</Link>
        <Link className="item" to="/user/inactive">Accept new users</Link>
        <Link className="item" to="/user">All users</Link>
        <Link className="item" to="/studyfield">Studyfields</Link>
        <Link className="item" to="/emaildraft">Email drafts</Link>
        <a className="item" onClick={ this.handleLogout }>Logout</a>
      </div>
    );
  }
        // <Link className="item" to="/emailstatus">Email statuses</Link>

  renderNav() {
    const isAdmin = this.props.user.role === "admin";
    const isPrintPerson = this.props.user.role === "print-person";
    return (
      <div>
        { isAdmin ? this.renderAdminNav() : isPrintPerson ? this.renderPrintPersonNav() : this.renderUserNav() }
      </div>
    );
  }
  /**
   * The render method which states what to render onto the view.
   */
  render() {
    return (
      <div id="nav">
        <div className="ui horizontal pointing menu">
          <Link className="item" to="/">FrontPage</Link>
          <Link className="item" to="/login">Login</Link>
          <Link className="item" to="/registration">Register</Link>
        </div>
      </div>
    );
    const loggedIn = this.props.user.role !== undefined;
    return (
      <div id="nav">
        { loggedIn ? this.renderNav() : this.renderNonLoggedNav() }
      </div>
    );
  }
}

// import { connect } from "react-redux";
//
// const mapStateToProps = (state) => {
//   const auth = state.get("auth");
//   return {
//     user: auth.get("user").toJS(),
//   };
// };
//
// const mapDispatchToProps = (dispatch) => ({
//   logout() {
//     dispatch(logout());
//   },
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Nav);
