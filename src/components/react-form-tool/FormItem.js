import React, { Component } from "react";
import Field from "./Field";

class FormItem extends Component {
  render() {
    const { label } = this.props;
    const pot = ":";

    return (
      <div className="form-item">
        <label className="form-item-label">
          {label && label + (pot ? pot : "")}
        </label>
        <Field>{this.props.children}</Field>
      </div>
    );
  }
}

export default FormItem;
