import React, { Component, Children, cloneElement } from 'react';
import FormContext from './context';
import * as utils from './utils';

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  $formutil;

  onChange = ev => {
    ev.persist();

    const eventValue = ev.target.value;

    this.setState({ value: eventValue });

    if (this.props.onChange) {
      this.props.onChange(ev);
    }

    const { name, formatter, parser } = this.props;

    const FieldValue = name
      ? formatter && utils.isFunction(formatter)
        ? formatter(eventValue)
        : eventValue
      : eventValue;

    const value =
      parser && utils.isFunction(parser) ? parser(FieldValue) : FieldValue;

    this.props.valuePropName(value);

    if (name) {
      this.$formutil.$setParams({
        [this.props.name]: value
      });
    }
  };

  renderField = (name, formatter) => {
    let { children } = this.props;
    const context = this.$formutil;

    const FieldValue = name
      ? formatter && utils.isFunction(formatter)
        ? formatter(context.$params[name])
        : context.$params[name]
      : this.state.value;

    const $fieldutil = Object.assign(
      {
        name: name,
        onChange: this.onChange.bind(this)
      },
      {
        value:
          formatter && utils.isFunction(formatter)
            ? formatter(FieldValue)
            : FieldValue
      }
    );

    return Children.map(children, child =>
      child
        ? cloneElement(child, {
            ...$fieldutil
          })
        : child
    );
  };

  getFieldValue = (value, props) => {
    const { name, $defaultValue } = props;
    const { $defaultValues } = this.$formutil;

    return name
      ? value || $defaultValue || ($defaultValues && $defaultValues[name]) || ''
      : '';
  };

  componentDidMount() {
    this.setState((oldValue, props) => {
      return { value: this.getFieldValue(oldValue.value, props) };
    });
  }

  render() {
    const { name, formatter } = this.props;

    return (
      <FormContext.Consumer>
        {context => {
          this.$formutil = context;

          return (
            <div className={utils.getFieldClassName(context)}>
              {this.renderField(name, formatter)}
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

export default Field;
