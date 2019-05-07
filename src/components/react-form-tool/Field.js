import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";

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
    const $fieldutil = {
      name: this.props.name,
      onChange: this.onChange.bind(this)
    };

    return (
      <div className={"field-inline"}>
        <FormContext.Consumer>
          {context => {
            if (this.state.value) {
              context.$params = Object.assign(context.$params, {
                [this.props.name]: this.state.value
              });
            }

            return this.renderField($fieldutil, this.props);
          }}
        </FormContext.Consumer>
      </div>
    );
  }
}

export default Field;
