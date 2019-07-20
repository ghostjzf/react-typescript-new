import React, { Component, Children, cloneElement } from "react";
import FormContext from "./context";
import * as utils from "./utils";

class Form extends Component {
    static defaultProps = {
        $defaultValues: {},
        $defaultStates: {}
    };

    state = {
        $form: {
            $params: {}
        }
    };

    _render = () => {
        const { children } = this.props;
        const { $form } = this.state;

        if (utils.isFunction(children)) {
            return children();
        }

        return Children.map(children, child => {
            return child && utils.isFunction(child.type)
                ? cloneElement(child, {
                      $form
                  })
                : child;
        });
    };

    render() {
        return <FormContext.Provider>{this._render()}</FormContext.Provider>;
    }
}

export default Form;
