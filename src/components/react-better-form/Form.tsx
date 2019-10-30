import React, { Children, cloneElement, createElement, useState } from 'react';
import FormContext from './context';
import * as utils from './utils';

const Form = ({ children }) => {
  const [params, setParams] = useState<any>({});
  const [registers, setRigisters] = useState<any>({});

  function $setParams($name, $value) {
    setParams(Object.assign(params, { [$name]: $value }));
  }

  function $setRegisters($name, $value) {
    setRigisters(Object.assign(registers, { [$name]: $value ? $value : null }));
  }

  const $form = {
    $parmas: params,
    $setParams: $setParams,
    $registers: registers,
    $setRegisters: $setRegisters
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

  return <FormContext.Provider value={$form}>{_render()}</FormContext.Provider>;
};

export default Form;
