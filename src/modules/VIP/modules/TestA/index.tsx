import React, { Component } from "react";
import { Form, Field, FormItem } from "components/react-form-tool";
import { Input, Button } from "antd";

class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  render() {
    return (
      <Form layout="vertical">
        {$formutil => {
          const onSubmit = () => {
            console.log($formutil);
          };

          return (
            <>
              <h3>使用Field</h3>
              <Field name="age" onChange={this.onChange}>
                <Input />
              </Field>
              <h3>使用FormItem</h3>
              <FormItem name="name" label="" onChange={this.onChange}>
                <Input />
              </FormItem>
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
