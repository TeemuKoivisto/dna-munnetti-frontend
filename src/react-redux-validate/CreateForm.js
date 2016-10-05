import Validate from "./Validate";
import { Component, PropTypes, createElement } from 'react'

export default function connect(options = {}) {

  return function wrapWithConnect(WrappedComponent) {

    return class Connect extends Component {
      constructor() {
        super();
        this.state = {
          // Users: [],
          updateUser: Validate.createForm("loginForm", "loginUser"),
        };
      }

      componentWillMount() {
        Validate.subscribeToForm("loginForm", "xx", (loginForm) => {
          this.setState({ loginForm, });
        });
      }

      componentWillUnmount() {
        Validate.unsubscribe("loginForm");
      }

      render() {
        return createElement(WrappedComponent, {
          ...this.props,
          ref: 'wrapped',
        })
      }
    }
  }
}
