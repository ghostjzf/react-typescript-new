import React from 'react';
import { hot } from 'react-hot-loader';
import { Form, FormItem } from 'components/antd-better-form';
import {
  Input,
  InputNumber,
  Button,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Select,
  Rate,
  Switch,
  Slider,
  Row,
  Col
} from 'antd';
import moment from 'moment';

const FormComp = () => {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  return (
    <div>
      <Form layout="horizontal">
        {$form => {
          const onSubmit = () => {
            console.log($form);
          };

          return (
            <>
              <FormItem
                name="input"
                required
                validMessage="input is required"
                $defaultValue={111}
                $formatter={value => `$${value}`}
                itemProps={{
                  ...formItemLayout,
                  label: 'Input输入框'
                }}
              >
                <Input />
              </FormItem>
              <FormItem
                name="inputNumber"
                itemProps={{
                  label: 'InputNumber数字框',
                  ...formItemLayout
                }}
              >
                <InputNumber />
              </FormItem>

              <FormItem
                name="select"
                $defaultValue="lucy"
                itemProps={{
                  label: 'Select下拉框',
                  ...formItemLayout
                }}
              >
                <Select style={{ width: 200 }}>
                  <Select.Option value="jack">Jack</Select.Option>
                  <Select.Option value="lucy">Lucy</Select.Option>
                  <Select.Option value="disabled" disabled>
                    Disabled
                  </Select.Option>
                  <Select.Option value="Yiminghe">yiminghe</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="date"
                $defaultValue={moment('2019-10-13')}
                $parser={value => moment(value).valueOf()}
                itemProps={{
                  label: 'DatePicker',
                  ...formItemLayout
                }}
              >
                <DatePicker />
              </FormItem>
              <FormItem
                name="time"
                $defaultValue={moment(new Date(), 'HH:mm:ss')}
                $parser={value => moment(value).valueOf()}
                itemProps={{
                  label: 'TimePicker',
                  ...formItemLayout
                }}
              >
                <TimePicker />
              </FormItem>
              <FormItem
                name="isChecked"
                itemProps={{
                  ...formItemLayout,
                  label: 'CheckBox'
                }}
              >
                <Checkbox>A</Checkbox>
              </FormItem>
              <FormItem
                name="isChecked2"
                $defaultValue={['A', 'C']}
                itemProps={{
                  label: 'Check Group',
                  ...formItemLayout
                }}
              >
                <Checkbox.Group>
                  <Checkbox value="A">A</Checkbox>
                  <Checkbox value="B">B</Checkbox>
                  <Checkbox value="C">C</Checkbox>
                </Checkbox.Group>
              </FormItem>
              <FormItem
                name="radio"
                $defaultValue="B"
                itemProps={{
                  label: 'Radio',
                  ...formItemLayout
                }}
              >
                <Radio.Group>
                  <Radio value="A">A</Radio>
                  <Radio value="B">B</Radio>
                  <Radio value="C">C</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                name="rate"
                $defaultValue={2.5}
                itemProps={{
                  label: 'Rate',
                  ...formItemLayout
                }}
              >
                <Rate allowHalf />
              </FormItem>
              <FormItem
                name="switch"
                $defaultValue={true}
                itemProps={{
                  label: 'Switch开关',
                  ...formItemLayout
                }}
              >
                <Switch />
              </FormItem>
              <FormItem
                name="slider"
                $defaultValue={50}
                itemProps={{
                  label: 'Slider进度条',
                  ...formItemLayout
                }}
              >
                <Slider />
              </FormItem>
              <Row>
                <Col push={4}>
                  <Button
                    style={{ marginRight: '12px' }}
                    type="primary"
                    onClick={onSubmit}
                  >
                    确定
                  </Button>
                  <Button>重置</Button>
                </Col>
              </Row>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default hot(module)(FormComp);
