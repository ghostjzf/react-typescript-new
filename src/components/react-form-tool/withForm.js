import React, { Component } from "react";
import Form from "./Form";

export default function withForm(WrapppedComponent) {
  return class extends Component {
    render() {
      return (
        <Form>
          {$formutil => {
            return <WrapppedComponent {...this.props} $formutil={$formutil} />;
          }}
        </Form>
      );
    }
  };
}
