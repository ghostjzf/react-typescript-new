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
  const [stateTree, setStateTree] = useState<any>({});
  const [errors, setErrors] = useState<any[]>([]);

  function $setParams($name, $value) {
    setParams(Object.assign(params, { [$name]: $value }));
  }

  function $setRegisters($name, $value) {
    setRigisters(Object.assign(registers, { [$name]: $value ? $value : null }));
  }

  function $setDefaultState($name, $value) {
    setDefaultState(Object.assign(defaultState, { [$name]: $value }));
  }

  function $setStateTree($name, $value) {
    setStateTree(Object.assign(defaultState, { [$name]: $value }));
  }

  const $invalid = false;

  const $form = {
    $parmas: params,
    $setParams: $setParams,
    $registers: registers,
    $setRegisters: $setRegisters,
    $defaultState: defaultState,
    $setDefaultState: $setDefaultState,
    $stateTree: stateTree,
    $setStateTree: $setStateTree,
    $valid: true,
    $invalid: $invalid
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
