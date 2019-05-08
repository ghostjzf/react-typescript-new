import React, { Component } from "react";
import { Form, FormItem } from "components/react-form-tool";
import { Input, Button } from "antd";

class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  render() {
    return (
      <Form layout="inline">
        {$formutil => {
          const onSubmit = () => {
            console.log($formutil);
          };

          return (
            <>
              {/* <h3>使用FormItem</h3> */}
              <FormItem name="name" label="姓名">
                <Input />
              </FormItem>
              <FormItem name="height" label="身高">
                <Input />
              </FormItem>
              <FormItem name="age" label="年龄">
                <Input />
              </FormItem>
              <FormItem name="weight" label="体重">
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
