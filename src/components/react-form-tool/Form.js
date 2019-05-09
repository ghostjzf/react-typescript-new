import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";
import * as utils from "./utils";

class Form extends Component {
  $formutil = {
    $params: {},
    $reset: () => {},
    layout: this.props.layout || "vertical"
  };

  _render() {
    const $formutil = this.$formutil;
    let { children } = this.props;

    if (utils.isFunction(children)) {
      return children($formutil);
    }

    return Children.map(children, child => {
      return child && utils.isFunction(child.type)
        ? cloneElement(child, {
            $formutil
          })
        : child;
    });
  }

  render() {
    return (
      <FormContext.Provider value={this.$formutil}>
        {this._render()}
      </FormContext.Provider>
    );
  }
}

export default Form;
