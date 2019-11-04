import React, { Children, cloneElement, useState } from 'react';
import { Form as AntdForm } from 'antd';
import FormContext from './context';
import * as utils from './utils';

export interface FormProps {
  children: any;
  hideRequiredMark: boolean;
  labelAlign: 'left' | 'right';
  labelCol?: any;
  wrapperCol?: any;
  layout: 'horizontal' | 'vertical' | 'inline';
  colon: boolean;
  onSubmit?: ($form: any) => void;
}

const Form = ({ children, ...formProps }: FormProps) => {
  const [params, setParams] = useState<any>({});
  const [registers, setRigisters] = useState<any>({});
  const [defaultState, setDefaultState] = useState<any>({});
  const [errors, setErrors] = useState<any[]>([]);
  const [invalid, setInvalid] = useState<boolean>(false);

  function $setParams($name, $value) {
    setParams(Object.assign(params, { [$name]: $value }));
  }

  function $setRegisters($name, $value) {
    if (registers[$name]) {
      console.warn(`${$name} has ever been registed!`);

      return;
    }

    setRigisters(Object.assign(registers, { [$name]: $value ? $value : null }));
  }

  function $setDefaultState($name, $value) {
    setDefaultState(Object.assign(defaultState, { [$name]: $value }));
  }

  function $setErrors($name, $value) {
    setInvalid(true);
    setErrors(Object.assign(errors, { [$name]: $value }));
  }

  function $removeError($name) {
    setInvalid($checkInvalid(errors, $name));
    setErrors(Object.assign(errors, { [$name]: null }));
  }

  function $checkInvalid(errors, $name) {
    const errorArray = Object.entries(errors).filter(item => item[1]);

    return errorArray.length === 1 && errorArray[0][0] === $name ? false : true;
  }

  function $reset() {
    Object.entries(defaultState)
      .filter(item => item[1] !== undefined)
      .forEach(item => {
        $setParams(item[0], item[1]);
      });

    Object.entries(defaultState).forEach(item => {
      registers[item[0]](item[1]);
    });
  }

  const $form = {
    $parmas: params,
    $setParams: $setParams,
    $registers: registers,
    $setRegisters: $setRegisters,
    $defaultState: defaultState,
    $setDefaultState: $setDefaultState,
    $valid: !invalid,
    $invalid: invalid,
    $setErrors: $setErrors,
    $removeError: $removeError,
    $errors: errors,
    $reset: $reset
  };

  function _render() {
    if (utils.isFunction(children)) {
      return children($form);
    }
    return Children.map(children, child =>
      child && utils.isComponent(child.type)
        ? cloneElement(child, {
            $form
          })
        : child
    );
  }

  return (
    <FormContext.Provider value={$form}>
      <AntdForm {...formProps}>{_render()}</AntdForm>
    </FormContext.Provider>
  );
};

Form.defaultProps = {
  hideRequiredMark: false,
  labelAlign: 'right',
  layout: 'horizontal',
  colon: true
};

export default Form;
