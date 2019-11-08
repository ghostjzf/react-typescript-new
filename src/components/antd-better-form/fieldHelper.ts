import { isFunction } from './utils';

export const defaultProps = {
  changePropName: 'onChange',
  valuePropName: 'value',
  $parser: value => (typeof value === 'string' ? value.trim() : value)
};

export function parserProps(props, context) {
  const {
    $setDefaultState,
    $setParams,
    $setErrors,
    $removeError,
    $registers,
    $setRegisters
  } = context;
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
    $validators,
    validMessage,
    children,
    changePropName,
    valuePropName,
    ...rest
  } = props;

  let filedProps: any;

  const isRequired =
    required === undefined || required === false ? false : true;

  const $getValidResult = $value =>
    $validators && $focus
      ? isFunction($validators)
        ? $validators($value) === true
          ? undefined
          : $validators($value)
        : console.error('$validators need a type of function')
      : undefined;

  const onChange = ev => {
    const value = ev && ev.target ? ev.target[valuePropName] : ev;
    const parserValue = $parser ? $parser(value) : value;
    const $validResult = $getValidResult(value);

    $setParams(name, parserValue);
    $setValue(value);

    !$focus && $setFocus(true);
    $validResult ? $setErrors(name, $validResult) : $removeError(name);

    children(filedProps);

    if ($onChange) {
      $onChange(parserValue);
    }
  };

  if (!$registers[name]) {
    $setRegisters(name, $setValue);

    if ($defaultValue) {
      $setParams(name, $parser ? $parser($defaultValue) : $defaultValue);

      if ($formatter) {
        $setValue($formatter($defaultValue));
        $setDefaultState(name, $formatter($defaultValue));
        $getValidResult($formatter($defaultValue)) ||
        (isRequired &&
          $defaultValue !== undefined &&
          $defaultValue !== 0 &&
          $defaultValue !== '' &&
          $defaultValue !== false &&
          $defaultValue !== null &&
          !$defaultValue)
          ? $setErrors(
              name,
              $getValidResult($formatter($defaultValue)) || validMessage
            )
          : $removeError(name);

        Object.assign(rest, {
          [valuePropName]: $formatter($defaultValue)
        });
      } else {
        $setValue($defaultValue);
        $setDefaultState(name, $defaultValue);
        $getValidResult($defaultValue) ||
        (isRequired && $defaultValue !== undefined)
          ? $setErrors(name, $getValidResult($defaultValue) || validMessage)
          : $removeError(name);

        Object.assign(rest, {
          [valuePropName]: $defaultValue
        });
      }
    } else {
      if ($formatter) {
        $setValue($formatter($value));
        $setDefaultState(name, $formatter($value));
        $getValidResult($formatter($value)) || isRequired
          ? $setErrors(
              name,
              $getValidResult($formatter($value)) || validMessage
            )
          : $removeError(name);

        Object.assign(rest, {
          [valuePropName]: $formatter($value)
        });
      } else {
        $setDefaultState(name, $value);
        $getValidResult($value) || isRequired
          ? $setErrors(
              name,
              $getValidResult($value) ||
                validMessage ||
                '$validators do not return a error meesage or validMessage is empty'
            )
          : $removeError(name);

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

  return children(filedProps);
}
