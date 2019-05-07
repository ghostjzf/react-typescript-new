import React, { Component } from "react";
import { Form, Field } from "components/react-form-tool";
import { Input, Button } from "antd";
class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  onSubmit = ev => {
    console.log(ev);
  };

  render() {
    return (
      <Form>
        {$formutil => {
          console.log($formutil, 111);

          return (
            <>
              <Field name="age" onChange={this.onChange}>
                <Input />
              </Field>
              <Field name="name" onChange={this.onChange}>
                <Input />
              </Field>
              <Button type="primary" onClick={this.onSubmit}>
                submit
              </Button>
            </>
          );
        }}
      </Form>
    );
  }
}

export default TestA;
