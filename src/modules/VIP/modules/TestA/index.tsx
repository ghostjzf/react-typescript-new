import React, { Component } from "react";
import { Form, FormItem } from "components/react-form-tool";
import { Input, Button } from "antd";

class TestA extends Component {
  onChange(ev) {
    console.log(ev.target.value);
  }

  render() {
    return (
      <Form $defaultValues={{ name: 1 }}>
        {$formutil => {
          const onSubmit = () => {
            console.log($formutil);
          };

          const onReset = () => {
            $formutil.$reset();

            console.log($formutil);
          };

          return (
            <>
              {/* <h3>使用FormItem</h3> */}
              <FormItem
                className="name"
                name="name"
                label="姓名"
                labelLayout="inline"
                $defaultValue="555"
              >
                <Input placeholder="请输入姓名" />
              </FormItem>
              <FormItem name="" label="身高">
                <Input placeholder="请输入身高" />
              </FormItem>
              <FormItem name="age" label="年龄">
                <Input placeholder="请输入年龄" />
              </FormItem>
              <FormItem name="weight" label="体重">
                <Input placeholder="请输入体重" />
              </FormItem>
              <Button type="primary" onClick={onSubmit}>
                submit
              </Button>
              <Button type="primary" onClick={onReset}>
                reset
              </Button>
            </>
          );
        }}
      </Form>
    );
  }
}

export default TestA;
