import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";
import * as utils from "./utils";

class Form extends Component {
  static defaultProps = {
    $defaultValues: {},
    $defaultStates: {}
  };

  state = {
    $params: {}
  };

  $formutil;

  $$reset = () => {
    this.setState({
      $params: Object.assign({}, this.props.$defaultValues)
    });
  };

  $setParams = params => {
    this.setState({
      $params: Object.assign(this.state.$params, params)
    });
  };

  _render($formutil) {
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

  componentDidMount() {
    this.setState({
      $params: Object.assign({}, this.props.$defaultValues, this.state.$params)
    });
  }

  render() {
    const $formutil = (this.$formutil = {
      $params: this.state.$params,
      $defaultValues: this.props.$defaultValues || {},
      $reset: this.$$reset,
      $setParams: this.$setParams,
      layout: this.props.layout || "vertical"
    });

    return (
      <FormContext.Provider value={$formutil}>
        {this._render($formutil)}
      </FormContext.Provider>
    );
  }
}

export default Form;
