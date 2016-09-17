import React from "react";
import { Link } from "react-router";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <main className="main-container m-top">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
