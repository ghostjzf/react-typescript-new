import React, { Component } from "react";
import Field from "./Field";
import FormContext from "./context";
import * as utils from "./utils";

class FormItem extends Component {
  static defaultProps = {
    labelLayout: "inline",
    required: false
  };

  state = {
    valuePropName: "",
    hasEdit: false
  };

  setValue = value => {
    console.log("setValue");
    this.setState({ valuePropName: value, hasEdit: true });
  };

  render() {
    const { valuePropName, hasEdit } = this.state;
    const {
      children,
      labelLayout,
      className,
      required,
      $validators,
      ...otherProps
    } = this.props;
    const pot = ":";
    const requiredValidate =
      $validators && $validators.required ? $validators.required : false;

    return (
      <FormContext.Consumer>
        {context => {
          return (
            <div className={utils.getFormItemClassName(context, className)}>
              <label
                className={utils.getFormItemLaybelClassName(
                  context,
                  labelLayout
                )}
              >
                {otherProps.label &&
                  otherProps.label +
                    (pot && (labelLayout === "inline" || !labelLayout)
                      ? pot
                      : "")}
              </label>
              <Field valuePropName={this.setValue} {...otherProps}>
                {this.props.children}
              </Field>
              {required && (
                <div
                  className={utils.getErrorMsgClassName(context, labelLayout)}
                >
                  {hasEdit &&
                    typeof requiredValidate === "function" &&
                    requiredValidate(valuePropName)}
                  {hasEdit &&
                    typeof requiredValidate === "string" &&
                    requiredValidate}
                </div>
              )}
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

export default FormItem;
