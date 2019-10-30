import React, { FC, Children, cloneElement } from 'react';
import FormContext from './context';
import * as utils from './utils';
// import { parserProps } from './fieldHelper';

export interface FiledComponentProps {
  name?: string;
  onChange?: (value?) => void;
  defaultValue?: any;
  formatter?: (value?) => string | number;
  parser?: (value?) => string | number;
  changePropName?: string;
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

  function parserProps(props, $setParams, $setRegisters) {
    const {
      name,
      onChange: $onChange,
      defaultValue,
      formatter,
      parser,
      children,
      changePropName,
      ...rest
    } = props;

    const onChange = ev => {
      const value = ev && ev.target ? ev.target.value : ev;
      const parserValue = parser ? parser(value) : value;

      if (name) {
        $setParams(name, parserValue);
        $setRegisters(name, parserValue);
      }

      if ($onChange) {
        $onChange(parserValue);
      }

      if (formatter) {
        const formatValue = formatter ? formatter(value) : value;

        renderField({ value: formatValue });
      }
    };

    if (formatter && defaultValue) {
      const formatValue = formatter(defaultValue);

      Object.assign(rest, { defaultValue: formatValue });
    } else if (defaultValue) {
      Object.assign(rest, { defaultValue });
    }

    Object.assign(
      rest,
      changePropName ? { [changePropName]: onChange } : { onChange }
    );

    return { ...rest, name };
  }

  return (
    <FormContext.Consumer>
      {(context: any) => {
        const { name: $name, defaultValue, parser } = props;
        const { $setParams, $registers, $setRegisters } = context;

        if ($name) {
          if (!$registers[$name]) {
            $setRegisters($name, parser ? parser(defaultValue) : defaultValue);
          }

          if (defaultValue) {
            $setParams($name, parser ? parser(defaultValue) : defaultValue);
          }
        }

        if (utils.isFunction(children)) {
          return children(parserProps(props, $setParams, $setRegisters));
        }

        return Children.map(children, child =>
          child && utils.isValidElement(child.type)
            ? cloneElement(child, parserProps(props, $setParams, $setRegisters))
            : child
        );
      }}
    </FormContext.Consumer>
  );
};

export default Field;
