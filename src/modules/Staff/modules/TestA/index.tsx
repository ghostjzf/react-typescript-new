import React, { Component } from "react";
import { Form, Field } from "components/react-form-tool";
import { Input, Button } from "antd";

class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  onSubmit = ev => {
    console.log((this.props as any).$formutil);
    console.log(ev);
  };

  render() {
    return (
      <Form layout="inline">
        {$formutil => {
          console.log($formutil, 111);

          const onSubmit = () => {
            console.log((this.props as any).$formutil);
            console.log("1111111111111111111");
            console.log($formutil);
          };

          return (
            <>
              <Field name="age" onChange={this.onChange}>
                <Input />
              </Field>
              <Field name="name" onChange={this.onChange}>
                <Input />
              </Field>
              <Button type="primary" onClick={onSubmit}>
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
