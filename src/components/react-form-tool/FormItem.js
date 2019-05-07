import React, { Component } from "react";
import Field from "./Field";

class FormItem extends Component {
  render() {
    const { label } = this.props;

    return (
      <div>
        <label>{label}</label>
        <Field>{this.props.children}</Field>
      </div>
    );
  }
}

export default FormItem;
