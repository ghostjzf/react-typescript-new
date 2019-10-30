import React, { FC, Children, cloneElement } from 'react';
import FormContext from './context';
import * as utils from './utils';
// import { parserProps } from './fieldHelper';

export interface FiledComponentProps {
  name?: string;
  $onChange?: (value?) => void;
  $defaultValue?: any;
  $value?: any;
  $formatter?: (value?) => string | number;
  $parser?: (value?) => string | number;
  changePropName?: string;
  valuePropName?: string;
  children: any;
}

const Field: FC<FiledComponentProps> = props => {
  const { children } = props;

  function renderField(props) {
    return Children.map(children, child =>
      child && utils.isValidElement(child.type)
        ? cloneElement(child, props)
        : child
    );
  }

  function parserProps(props, $setParams, $setRegisters, $registers) {
    const {
      name,
      $onChange,
      $defaultValue,
      $defaultChecked,
      $value,
      $formatter,
      $parser,
      children,
      changePropName,
      valuePropName,
      ...rest
    } = props;

    const onChange = ev => {
      const value = ev && ev.target ? ev.target.value || ev.target.checked : ev;
      const parserValue = $parser ? $parser(value) : value;

      if (name) {
        $setParams(name, parserValue);
        $setRegisters(name, parserValue);
      }

      if ($onChange) {
        $onChange(parserValue);
      }

      if ($formatter) {
        const formatValue = $formatter ? $formatter(value) : value;

        renderField({ value: formatValue });
      }
    };

    if (name) {
      if (!$registers[name]) {
        $setRegisters(name, $parser ? $parser($defaultValue) : $defaultValue);
      }

      if ($defaultValue) {
        $setParams(name, $parser ? $parser($defaultValue) : $defaultValue);
      }
    }

    if ($formatter && $defaultValue) {
      const formatValue = $formatter($defaultValue);

      Object.assign(rest, { defaultValue: formatValue });
    } else if ($defaultValue) {
      Object.assign(rest, { defaultValue: $defaultValue });
    }

    Object.assign(
      rest,
      changePropName ? { [changePropName]: onChange } : { onChange },
      valuePropName ? { [valuePropName]: $value } : {},
      $defaultValue ? { defaultValue: $defaultValue } : {}
    );

    return { ...rest, name };
  }

  return (
    <FormContext.Consumer>
      {(context: any) => {
        const { $setParams, $registers, $setRegisters } = context;

        if (utils.isFunction(children)) {
          return children(
            parserProps(props, $setParams, $setRegisters, $registers)
          );
        }

        return Children.map(children, child =>
          child && utils.isValidElement(child.type)
            ? cloneElement(
                child,
                parserProps(props, $setParams, $setRegisters, $registers)
              )
            : child
        );
      }}
    </FormContext.Consumer>
  );
};

export default Field;
