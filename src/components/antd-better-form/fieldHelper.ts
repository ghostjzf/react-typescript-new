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
    $setRegisters,
    $setDefaultErrors
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

  if (!$registers[name] && !!valuePropName) {
    $setRegisters(name, { $setValue, $setFocus });

    if ($defaultValue) {
      $setParams(name, $parser ? $parser($defaultValue) : $defaultValue);

      const checkRequiredNotPass =
        isRequired &&
        $defaultValue !== undefined &&
        $defaultValue !== 0 &&
        $defaultValue !== '' &&
        $defaultValue !== false &&
        $defaultValue !== null &&
        !$defaultValue;

      if ($formatter) {
        $setValue($formatter($defaultValue));
        $setDefaultState(name, $formatter($defaultValue));

        if (
          $getValidResult($formatter($defaultValue)) ||
          checkRequiredNotPass
        ) {
          const validMsg =
            $getValidResult($formatter($defaultValue)) || validMessage;

          $setErrors(name, validMsg);
          $setDefaultErrors(name, validMsg);
        } else {
          $removeError(name);
        }

        Object.assign(rest, {
          [valuePropName]: $formatter($defaultValue)
        });
      } else {
        $setValue($defaultValue);
        $setDefaultState(name, $defaultValue);

        if ($getValidResult($defaultValue) || checkRequiredNotPass) {
          const validMsg = $getValidResult($defaultValue) || validMessage;

          $setErrors(name, validMsg);
          $setDefaultErrors(name, validMsg);
        } else {
          $removeError(name);
        }

        Object.assign(rest, {
          [valuePropName]: $defaultValue
        });
      }
    } else {
      if ($formatter) {
        $setValue($formatter($value));
        $setDefaultState(name, $formatter($value));

        if ($getValidResult($formatter($value)) || isRequired) {
          const validMsg = $getValidResult($formatter($value)) || validMessage;

          $setErrors(name, validMsg);
          $setDefaultErrors(name, validMsg);
        } else {
          $removeError(name);
        }

        Object.assign(rest, {
          [valuePropName]: $formatter($value)
        });
      } else {
        $setDefaultState(name, $value);

        if ($getValidResult($value) || isRequired) {
          const validMsg =
            $getValidResult($value) ||
            validMessage ||
            '$validators do not return a error meesage or validMessage is empty';

          $setErrors(name, validMsg);
          $setDefaultErrors(name, validMsg);
        } else {
          $removeError(name);
        }

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
