
import Core from "./Core";
import reducer from "./validate.reducer";
import { createForm, updateForm, replaceForm } from "./validate.actions";

// react-redux-validate

class Validate {

  constructor() {
    this.state = reducer(undefined, { type: "INIT" });
    this.subscribers = [];
  }

  _reduce(formname, action) {
    this.state = reducer(this.state, action);
    this.subscribers.map(subscriber => {
      if (subscriber.formname === formname) {
        subscriber.update(this.getForm(formname));
      }
    });
  }

  getForms() {
    return this.state.get("forms").toJS();
  }

  getForm(formname) {
    return this.state.get("forms").toJS()[formname];
  }

  getFormValues(formname) {
    return this.state.get("forms").toJS()[formname].values;
  }

  getFormField(formname, field) {
    return this.state.get("forms").toJS()[formname].values[field];
  }

  getFormErrors(formname) {
    return this.state.get("forms").toJS()[formname].errors;
  }

  getFieldErrors(formname, model, field) {
    return this.state.get("forms").toJS()[formname].errors[`${model}_${field}`];
  }

  subscribeToForm(formname, subscriber, update) {
    const subscription = {
      formname,
      subscriber,
      update,
    };
    subscription.update(this.getForm(formname));
    this.subscribers.push(subscription);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(s => {
      if (s.subscriber !== subscriber) return s;
    });
  }

  createForm(name, model) {
    this.state = reducer(this.state, createForm(name, model));
    return this.getForm(name);
  }

  resetForm(formname) {

  }

  replaceForm(formname, newValues) {
    const form = this.getForm(formname);
    const errors = Core.validateForm(newValues, form.model);
    // console.log(newValues);
    this._reduce(formname, replaceForm(formname, newValues, errors));
    // console.log(this.getForm(formname));
  }

  updateForm(formname, field, value) {
    const form = this.getForm(formname);
    const errors = Core.validateField(form.values, form.model, field, value);
    this._reduce(formname, updateForm(formname, field, value, errors));
  }

  isFormValid(formname) {
    const form = this.getForm(formname);
    if (form) {
      const errors = Core.validateForm(form.values, form.model);
      this._reduce(formname, updateForm(formname, "", "", errors));
      // console.log(errors);
      const count = Object.keys(errors).reduce((previousValue, key) => {
        return previousValue + errors[key].length;
      }, 0);
      return count === 0;
    } else {
      return false;
    }
  }

  validateDataToModel(data, model) {
    const form = {
      model,
      values: data,
      errors: {
        obj: {},
        list: [],
      }
    };
    const errors = Core.validateForm(form);
    return errors;
  }

  setCustomRules(customRules) {
    // Core.setCustomRules(customRules);
  }

  addSchemas(schemas) {
    Core.addSchemas(schemas);
  }
}

export default new Validate();
