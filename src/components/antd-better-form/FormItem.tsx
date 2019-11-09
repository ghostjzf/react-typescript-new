import React, { FC, cloneElement, useState } from 'react';
import Filed, { FiledComponentProps } from './Field';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { isFunction } from './utils';

interface IFormItemProps extends FiledComponentProps {
  required?: boolean;
  validMessage?: string;
  $validators?: ($value) => boolean;
  itemProps?: FormItemProps;
  children: any;
}

const FormItem: FC<IFormItemProps | any> = ({
  children,
  $validators,
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
    childType === 'Checkbox' ||
    childType === 'Radio' ||
    childType === 'Switch'
  ) {
    fieldProps.valuePropName = 'checked';
  }

  if (childType === 'Transfer') {
    fieldProps.valuePropName = 'selectedKeys';
  }

  const isRequired =
    fieldProps.required === undefined || fieldProps.required === false
      ? false
      : true;

  const $validResult =
    $validators && $focus
      ? isFunction($validators)
        ? $validators($value) === true
          ? undefined
          : $validators($value)
        : console.error('$validators need a type of function')
      : undefined;

  const isShowHelp = ((isRequired && !$value) || $validResult) && $focus;

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
            required={isRequired}
            validateStatus={'validating'}
            help={
              isShowHelp && (
                <span style={{ color: 'red' }}>
                  {$validResult || fieldProps.validMessage || 'required'}
                </span>
              )
            }
            {...itemProps}
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
