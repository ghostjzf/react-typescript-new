import React from 'react';
import { hot } from 'react-hot-loader';
import { Form, FormItem } from 'components/antd-better-form';
import {
  AutoComplete,
  Input,
  InputNumber,
  Cascader,
  Button,
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Select,
  TreeSelect,
  Rate,
  Switch,
  Slider,
  Transfer,
  Upload,
  Icon,
  Row,
  Col,
  message
} from 'antd';
import moment from 'moment';

const { TreeNode } = TreeSelect;

const FormComp = () => {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ];

  let mockData: any[] = [];

  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 3 < 1
    });
  }

  const targetKeys = mockData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);

  return (
    <div>
      <Form layout="horizontal">
        {$form => {
          const { $params, $reset, $invalid, $getFirstError } = $form;

          const onSubmit = () => {
            if ($invalid) {
              message.error($getFirstError());
            } else {
              console.log($params);
            }
          };

          return (
            <>
              <FormItem
                name="autoComplete"
                itemProps={{
                  ...formItemLayout,
                  label: 'AutoComplete输入框'
                }}
              >
                <AutoComplete />
              </FormItem>
              <FormItem
                name="input"
                required
                validMessage="input is required"
                $defaultValue={111}
                $parser={value => `$${value}`}
                itemProps={{
                  ...formItemLayout,
                  label: 'Input输入框'
                }}
              >
                <Input />
              </FormItem>
              <FormItem
                name="cascader"
                itemProps={{ ...formItemLayout, label: 'Cascader' }}
              >
                <Cascader options={options} placeholder="Please select" />
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
                name="treeSelect"
                itemProps={{
                  label: 'TreeSelect下拉框',
                  ...formItemLayout
                }}
              >
                <TreeSelect
                  multiple
                  showSearch
                  style={{ width: 300 }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto'
                  }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random" />
                      <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode
                      value="parent 1-1"
                      title="parent 1-1"
                      key="random2"
                    >
                      <TreeNode
                        value="sss"
                        title={
                          <b
                            style={{
                              color: '#08c'
                            }}
                          >
                            sss
                          </b>
                        }
                        key="random3"
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
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
                required
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
                name="upload"
                itemProps={{ ...formItemLayout, label: 'Upload' }}
              >
                <Upload>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </FormItem>
              <FormItem
                name="transfer"
                itemProps={{ ...formItemLayout, label: 'Transfer' }}
              >
                <Transfer
                  dataSource={mockData}
                  titles={['Source', 'Target']}
                  targetKeys={targetKeys}
                  render={item => item.title}
                />
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
                  <Button onClick={$reset}>重置</Button>
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
