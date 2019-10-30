import React, { FC, cloneElement, Children } from 'react';
import Filed, { FiledComponentProps } from './Field';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

interface IFormItemProps extends FiledComponentProps, FormItemProps {}

const FormItem: FC<IFormItemProps> = ({ children, ...restProps }) => {
  return (
    <Filed {...restProps}>
      {itemProps => {
        return (
          <Form.Item {...itemProps}>
            {cloneElement(children, itemProps)}
          </Form.Item>
        );
      }}
    </Filed>
  );
};

export default FormItem;
