import Validate from "./Validate";
import { Component, PropTypes, createElement } from "react";

export default function connect(formOptions = {}) {

  // function computeMergedProps(stateProps, dispatchProps, parentProps) {
  //   const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
  //   if (process.env.NODE_ENV !== 'production') {
  //     checkStateShape(mergedProps, 'mergeProps')
  //   }
  //   return mergedProps
  // }

  return function wrapWithConnect(WrappedComponent) {

    return class CreateForm extends Component {
      constructor() {
        super();
        this.clearCache();
        Validate.createForm("loginForm", "loginUser");
        this.mergeProps(Validate.getForm("loginForm"));
      }

      clearCache() {
        this.mergedProps = {};
        this.haveOwnPropsChanged = true
        this.renderedElement = null
      }

      // updateMergedPropsIfNeeded() {
      //   const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
      //   if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
      //     return false
      //   }
      //
      //   this.mergedProps = nextMergedProps
      //   return true
      // }

      mergeProps(newProps) {
        const nextMergedProps = Object.assign({}, this.props || {}, { form: newProps });
        this.mergedProps = nextMergedProps;
      }

      componentWillMount() {
        const self = this;
        Validate.subscribeToForm("loginForm", "xx", (loginForm) => {
          console.log("setting state")
          self.mergeProps(loginForm);
          self.setState({});
        });
      }

      componentWillUnmount() {
        Validate.unsubscribe("xx");
      }

      render() {
        return createElement(WrappedComponent, {
          ...this.mergedProps,
        })
      }
    }
  }
}
