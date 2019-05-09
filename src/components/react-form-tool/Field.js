import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";
import * as utils from "./utils";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = ev => {
    ev.persist();

    this.setState({
      value: ev.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  };

  renderField = ($fieldutil, props) => {
    let { children } = props;

    return Children.map(children, child =>
      child
        ? cloneElement(child, {
            ...$fieldutil
          })
        : child
    );
  };

  render() {
    const { name, formatter, parser } = this.props;
    const { value: FieldValue } = this.state;

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

    return (
      <FormContext.Consumer>
        {context => {
          if (FieldValue && name) {
            const value =
              parser && utils.isFunction(parser)
                ? parser(FieldValue)
                : FieldValue;

            context.$params = Object.assign(context.$params, {
              [this.props.name]: value
            });
          }

          return (
            <div
              className={
                context.layout === "inline" ? "field-inline" : "field-block"
              }
            >
              {this.renderField($fieldutil, this.props)}
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

export default Field;
