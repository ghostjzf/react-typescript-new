import { Form } from 'antd';

export const defaultProps = {
  changePropName: 'onChange',
  valuePropName: 'value',
  $parser: value => (typeof value === 'string' ? value.trim() : value)
};

let onOff = false;

export function parserProps(props, context) {
  const { $setDefaultState, $setParams, $stateTree, $setStateTree } = context;
  const {
    name,
    required,
    $onChange,
    $defaultValue,
    $value,
    $setValue,
    $focus,
    $setFocus,
    $defaultChecked,
    $formatter,
    $parser,
    children,
    changePropName,
    valuePropName,
    ...rest
  } = props;

  let filedProps: any;

  const onChange = ev => {
    const value = ev && ev.target ? ev.target[valuePropName] || undefined : ev;
    const parserValue = $parser ? $parser(value) : value;

    onOff = true;

    $setParams(name, parserValue);
    $setStateTree(name, value);

    $setValue(value);

    !$focus && $setFocus(true);

    children({ ...filedProps });

    // $setState(name, parserValue);

    if ($onChange) {
      $onChange(parserValue);
    }
  };

  if (!onOff) {
    if ($defaultValue) {
      $setParams(name, $parser ? $parser($defaultValue) : $defaultValue);
      $setDefaultState(name, $defaultValue);
      $setStateTree(name, $defaultValue);

      if ($formatter) {
        $setValue($formatter($defaultValue));

        Object.assign(rest, {
          [valuePropName]: $value
        });
      } else {
        $setValue($defaultValue);

        Object.assign(rest, {
          [valuePropName]: $value
        });
      }
    } else {
      if ($formatter) {
        $setValue($formatter($value));

        Object.assign(rest, {
          [valuePropName]: $value
        });
      } else {
        Object.assign(rest, {
          [valuePropName]: $value
        });
      }
    }
  }

  Object.assign(rest, {
    [changePropName]: onChange,
    _TYPE_: valuePropName
  });

  filedProps = rest;

  console.log(filedProps);

  return children(filedProps);
}
