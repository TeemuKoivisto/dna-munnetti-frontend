import React from "react";

export class UserShow extends React.Component {

  constructor() {
    super();
    this.state = {
      updateUser: {
        email: "",
        firstname: "",
        lastname: "",
      }
    };
  }

  render() {
    const { User } = this.props;
    return (
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <h2 className="ui dividing header">Your information</h2>
            <div className="ui list">
              <div>
                <i className="user icon"></i>
                <span>
                  { `${User.firstname} ${User.lastname}` }
                </span>
              </div>
              <div>
                <i className="mail icon"></i>
                <span>
                  { User.email }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from "react-redux";
// import { updateUser } from "./user.actions";

const mapStateToProps = (state) => {
  return {
    User: state.auth.user,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   updateUser(data) {
//     dispatch(updateUser(data));
//   },
// });

export default connect(mapStateToProps, null)(UserShow);
