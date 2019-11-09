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
  const [defaultErrors, setDefaultErrors] = useState<any[]>([]);
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
      registers[item[0]].$setValue(item[1]);
      registers[item[0]].$setFocus(false);
    });

    setErrors(defaultErrors);

    const errorArray = Object.values(defaultErrors).filter(item => !!item);

    if (errorArray.length > 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }

  function $getField($name: string) {
    if (!registers[$name]) {
      console.log(`${$name} is not exist`);

      return;
    }

    return registers[$name];
  }
  function $getFirstError() {
    const errorArray = Object.values(errors).filter(item => !!item);

    if (errorArray && errorArray.length > 0) {
      return errorArray[0];
    }

    return;
  }

  function $setDefaultErrors($name, $error) {
    setDefaultErrors(Object.assign(defaultErrors, { [$name]: $error }));
  }

  const $form = {
    $params: params,
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
    $reset: $reset,
    $getField: $getField,
    $getFirstError: $getFirstError,
    $setDefaultErrors: $setDefaultErrors
  };

  function _render() {
    const {
      $registers,
      // $errors,
      $setErrors,
      $removeError,
      $setRegisters,
      $setDefaultState,
      $defaultState,
      $setParams,
      ...restForm
    } = $form;

    if (utils.isFunction(children)) {
      return children(restForm);
    }

    return Children.map(children, child =>
      child && utils.isComponent(child.type)
        ? cloneElement(child, {
            $form: restForm
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
