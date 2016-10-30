import Validate from "./Validate";
import { Component, PropTypes, createElement } from "react";

export default function connect(formOptions) {

  if (!formOptions || !formOptions.form) {
    throw new TypeError("No form passed to createForm");
  }

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
        this.formProps = {
          form: Validate.createForm("loginForm", "loginUser"),
          isFormValid: () => Validate.isFormValid("loginForm"),
          updateForm: (field, value) => Validate.updateForm("loginForm", field, value),
        }
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

      // mergeProps(newProps) {
      //   const nextMergedProps = Object.assign({}, this.props || {}, { form: newProps });
      //   this.formProps = nextMergedProps;
      // }

      componentWillMount() {
        const self = this;
        Validate.subscribeToForm("loginForm", "xx", (loginForm) => {
          console.log("setting state")
          self.formProps = Object.assign(this.formProps, { form: loginForm});
          self.setState({});
        });
      }

      componentWillUnmount() {
        Validate.unsubscribe("xx");
      }

      render() {
        return createElement(WrappedComponent, {
          ...this.props,
          ...this.formProps,
        })
      }
    }
  }
}
