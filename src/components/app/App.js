import React from "react";
import { Link } from "react-router";

import NavBar from "../ui/NavBar";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <main className="main-container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
