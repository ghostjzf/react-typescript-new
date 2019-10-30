export function parserProps(props, $setParams, $setRegisters, $name) {
  const { onChange: $onChanghe, formatter, ...rest } = props;

  const onChange = ev => {
    const value = ev && ev.target ? ev.target.value : ev;

    if (formatter) {
      Object.assign(rest, { value: formatter(value) });
    }

    $onChanghe(value);
    $setParams($name, value);
    $setRegisters($name, value);
  };

  return { ...rest, onChange };
}
