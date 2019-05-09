import React, { Component } from "react";
import Field from "./Field";
import FormContext from "./context";

class FormItem extends Component {
  static defaultProps = {
    labelLayout: "block"
  };

  render() {
    const { children, labelLayout, className, ...otherProps } = this.props;
    const pot = ":";

    return (
      <FormContext.Consumer>
        {context => {
          return (
            <div
              className={[
                "form-item",
                context.layout === "inline" ? "form-item-inline" : "",
                className
              ].join(" ")}
            >
              <label
                className={[
                  "form-item-label",
                  context.layout === "inline" && labelLayout !== "inline"
                    ? "form-item-label-block"
                    : ""
                ].join(" ")}
              >
                {otherProps.label &&
                  otherProps.label +
                    (pot &&
                    (context.layout !== "inline" || labelLayout === "inline")
                      ? pot
                      : "")}
              </label>
              <Field {...otherProps}>{this.props.children}</Field>
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

export default FormItem;
