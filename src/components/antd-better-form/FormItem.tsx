import React, { FC, cloneElement } from 'react';
import Filed, { FiledComponentProps } from './Field';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

interface IFormItemProps extends FiledComponentProps {
  itemProps: FormItemProps;
  children: any;
}

const FormItem: FC<IFormItemProps | any> = ({
  children,
  itemProps,
  ...fieldProps
}) => {
  const childType = children.type;

  const getChildType = () => {
    if (typeof childType === 'function') {
      return childType.name;
    }

    if (typeof childType === 'string') {
      return childType;
    }
  };

  return (
    <Filed {...fieldProps}>
      {fieldProps => {
        const childType = getChildType();

        if (
          childType === 'CheckBox' ||
          childType === 'Radio' ||
          childType === 'Switch'
        ) {
          fieldProps.defaultChecked = fieldProps.defaultValue;

          delete fieldProps.defaultValue;
        }

        return (
          <Form.Item {...itemProps}>
            {cloneElement(children, fieldProps)}
          </Form.Item>
        );
      }}
    </Filed>
  );
};

export default FormItem;
