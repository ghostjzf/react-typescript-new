import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";
import * as utils from "./utils";

class Field extends Component {
    $formContext;

    _renderField = () => {
        const { children, name } = this.props;

        return Children.map(children, child =>
            child
                ? cloneElement(child, {
                      name,
                      ...this.$formContext.$form
                  })
                : child
        );
    };

    render() {
        return (
            <FormContext.Consumer>
                {context => {
                    this.$formContext = context;

                    return <div>{this._renderField()}</div>;
                }}
            </FormContext.Consumer>
        );
    }
}

export default Field;
