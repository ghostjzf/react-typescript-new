import React, { FC, cloneElement, useState } from 'react';
import Filed, { FiledComponentProps } from './Field';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

interface IFormItemProps extends FiledComponentProps {
  required?: boolean;
  validMessage?: string;
  $validators?: ($value) => boolean;
  itemProps?: FormItemProps;
  children: any;
}

const FormItem: FC<IFormItemProps | any> = ({
  children,
  itemProps,
  ...fieldProps
}) => {
  const [$value, $setValue] = useState<any>();
  const [$focus, $setFocus] = useState<boolean>(false);

  const getChildType = () => {
    const childType = children.type;

    if (typeof childType === 'function') {
      return childType.name;
    }

    if (typeof childType === 'string') {
      return childType;
    }
  };

  const childType = getChildType();

  if (
    childType === 'CheckBox' ||
    childType === 'Radio' ||
    childType === 'Switch'
  ) {
    fieldProps.valuePropName = 'checked';
  }

  return (
    <Filed
      $value={$value}
      $setValue={$setValue}
      $focus={$focus}
      $setFocus={$setFocus}
      {...fieldProps}
      children={fieldHandleProps => {
        const { _TYPE_, ...childProps } = fieldHandleProps;

        return (
          <Form.Item
            required={
              fieldProps.required === undefined || fieldProps.required === false
                ? false
                : true
            }
            {...itemProps}
            validateStatus={'validating'}
            help={
              fieldProps.required &&
              !$value &&
              $focus && (
                <span style={{ color: 'red' }}>
                  {fieldProps.validMessage || 'required'}
                </span>
              )
            }
          >
            {cloneElement(children, {
              onChange: childProps.onChange,
              [_TYPE_]: $value
            })}
          </Form.Item>
        );
      }}
    />
  );
};

export default FormItem;
